import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { createApp } from "../app.js";

const FRONTEND = "https://example.com";

function makeMailer({ fail = false } = {}) {
    const calls = [];
    const fn = async (args) => {
        calls.push(args);
        if (fail) throw new Error("simulated send failure");
    };
    fn.calls = calls;
    return fn;
}

function buildApp(overrides = {}) {
    const sendEmail = overrides.sendEmail || makeMailer();
    const app = createApp({
        sendEmail,
        frontendUrl: FRONTEND,
        rateLimitMax: 100,
        cooldownMs: 60 * 60 * 1000,
        ...overrides,
    });
    return { app, sendEmail };
}

const validBody = { email: "visitor@example.com", message: "Hello there, this is a valid message." };

test("createApp throws without a sendEmail function", () => {
    assert.throws(() => createApp({ frontendUrl: FRONTEND }), /sendEmail/);
});

test("GET / returns a health payload", async () => {
    const { app } = buildApp();
    const res = await request(app).get("/");
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "ok");
});

test("POST /contact sends the email and reports success", async () => {
    const { app, sendEmail } = buildApp();
    const res = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.1")
        .send(validBody);

    assert.equal(res.status, 200);
    assert.equal(res.body.code, "SUCCESS");
    assert.equal(sendEmail.calls.length, 1);
    assert.equal(sendEmail.calls[0].email, "visitor@example.com");
});

test("POST /contact trims input before sending", async () => {
    const { app, sendEmail } = buildApp();
    await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.2")
        .send({ email: "  visitor@example.com  ", message: `  ${"x".repeat(20)}  ` });

    assert.equal(sendEmail.calls[0].email, "visitor@example.com");
    assert.equal(sendEmail.calls[0].message, "x".repeat(20));
});

test("POST /contact rejects an invalid email", async () => {
    const { app, sendEmail } = buildApp();
    const res = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.3")
        .send({ email: "not-an-email", message: "a valid length message" });

    assert.equal(res.status, 400);
    assert.equal(res.body.code, "INVALID_EMAIL");
    assert.equal(sendEmail.calls.length, 0);
});

test("POST /contact rejects a too-short message", async () => {
    const { app, sendEmail } = buildApp();
    const res = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.4")
        .send({ email: "visitor@example.com", message: "short" });

    assert.equal(res.status, 400);
    assert.equal(res.body.code, "INVALID_MESSAGE");
    assert.equal(sendEmail.calls.length, 0);
});

test("POST /contact rejects a too-long message", async () => {
    const { app } = buildApp();
    const res = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.5")
        .send({ email: "visitor@example.com", message: "a".repeat(2001) });

    assert.equal(res.status, 400);
    assert.equal(res.body.code, "INVALID_MESSAGE");
});

test("POST /contact handles a missing body", async () => {
    const { app } = buildApp();
    const res = await request(app).post("/contact").set("X-Forwarded-For", "10.0.0.6").send({});
    assert.equal(res.status, 400);
    assert.equal(res.body.code, "INVALID_EMAIL");
});

test("POST /contact returns 500 (SEND_FAILED) when the mailer throws", async () => {
    const { app } = buildApp({ sendEmail: makeMailer({ fail: true }) });
    const res = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.7")
        .send(validBody);

    assert.equal(res.status, 500);
    assert.equal(res.body.code, "SEND_FAILED");
});

test("cooldown blocks a second message from the same IP", async () => {
    const { app } = buildApp({ cooldownMs: 60 * 60 * 1000 });
    const ip = "10.0.0.8";

    const first = await request(app).post("/contact").set("X-Forwarded-For", ip).send(validBody);
    assert.equal(first.status, 200);

    const second = await request(app).post("/contact").set("X-Forwarded-For", ip).send(validBody);
    assert.equal(second.status, 429);
    assert.equal(second.body.code, "COOLDOWN_ACTIVE");
    assert.ok(second.body.retryAfterMs > 0);
});

test("cooldown does not block a different IP", async () => {
    const { app } = buildApp({ cooldownMs: 60 * 60 * 1000 });

    const a = await request(app).post("/contact").set("X-Forwarded-For", "10.0.0.9").send(validBody);
    const b = await request(app).post("/contact").set("X-Forwarded-For", "10.0.0.10").send(validBody);
    assert.equal(a.status, 200);
    assert.equal(b.status, 200);
});

test("cooldown of 0 lets the same IP send again", async () => {
    const { app } = buildApp({ cooldownMs: 0 });
    const ip = "10.0.0.11";
    const a = await request(app).post("/contact").set("X-Forwarded-For", ip).send(validBody);
    const b = await request(app).post("/contact").set("X-Forwarded-For", ip).send(validBody);
    assert.equal(a.status, 200);
    assert.equal(b.status, 200);
});

test("rate limiter returns 429 (RATE_LIMITED) after max requests", async () => {
    const { app } = buildApp({ rateLimitMax: 3 });
    const ip = "10.0.0.12";

    for (let i = 0; i < 3; i++) {
        const res = await request(app)
            .post("/contact")
            .set("X-Forwarded-For", ip)
            .send({ email: "bad", message: "short" });
        assert.equal(res.status, 400);
    }
    const limited = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", ip)
        .send({ email: "bad", message: "short" });
    assert.equal(limited.status, 429);
    assert.equal(limited.body.code, "RATE_LIMITED");
});

test("malformed JSON body returns 400 INVALID_JSON", async () => {
    const { app } = buildApp();
    const res = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.13")
        .set("Content-Type", "application/json")
        .send('{"email": "broken"');
    assert.equal(res.status, 400);
    assert.equal(res.body.code, "INVALID_JSON");
});

test("oversized body returns 413 PAYLOAD_TOO_LARGE", async () => {
    const { app } = buildApp();
    const huge = "a".repeat(20 * 1024);
    const res = await request(app)
        .post("/contact")
        .set("X-Forwarded-For", "10.0.0.14")
        .send({ email: "visitor@example.com", message: huge });
    assert.equal(res.status, 413);
    assert.equal(res.body.code, "PAYLOAD_TOO_LARGE");
});

test("unknown route returns 404 NOT_FOUND", async () => {
    const { app } = buildApp();
    const res = await request(app).get("/does-not-exist");
    assert.equal(res.status, 404);
    assert.equal(res.body.code, "NOT_FOUND");
});

test("CORS: allowed origin is reflected", async () => {
    const { app } = buildApp();
    const res = await request(app)
        .post("/contact")
        .set("Origin", FRONTEND)
        .set("X-Forwarded-For", "10.0.0.15")
        .send(validBody);
    assert.equal(res.headers["access-control-allow-origin"], FRONTEND);
});

test("CORS: disallowed origin is rejected with 403", async () => {
    const { app } = buildApp();
    const res = await request(app)
        .post("/contact")
        .set("Origin", "https://evil.example")
        .set("X-Forwarded-For", "10.0.0.16")
        .send(validBody);
    assert.equal(res.status, 403);
    assert.equal(res.body.code, "CORS_FORBIDDEN");
});
