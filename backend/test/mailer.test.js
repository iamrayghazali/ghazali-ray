import { test } from "node:test";
import assert from "node:assert/strict";

import { createEmailJsMailer, EMAILJS_ENDPOINT } from "../lib/mailer.js";

const CREDS = {
    serviceId: "service_123",
    templateId: "template_123",
    publicKey: "pub_123",
    privateKey: "priv_123",
};

function makeFetch({ ok = true, status = 200, body = "OK" } = {}) {
    const calls = [];
    const fn = async (url, options) => {
        calls.push({ url, options });
        return {
            ok,
            status,
            text: async () => body,
        };
    };
    fn.calls = calls;
    return fn;
}

test("createEmailJsMailer validates required credentials", () => {
    assert.throws(() => createEmailJsMailer({ ...CREDS, serviceId: undefined }), /serviceId/);
    assert.throws(() => createEmailJsMailer({ ...CREDS, templateId: undefined }), /templateId/);
    assert.throws(() => createEmailJsMailer({ ...CREDS, publicKey: undefined }), /publicKey/);
    assert.throws(() => createEmailJsMailer({ ...CREDS, privateKey: undefined }), /privateKey/);
});

test("sendEmail POSTs the EmailJS payload with keys and template params", async () => {
    const fetchImpl = makeFetch();
    const sendEmail = createEmailJsMailer({ ...CREDS, fetchImpl });

    await sendEmail({ email: "visitor@example.com", message: "a valid message here" });

    assert.equal(fetchImpl.calls.length, 1);
    const { url, options } = fetchImpl.calls[0];
    assert.equal(url, EMAILJS_ENDPOINT);
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "application/json");

    const payload = JSON.parse(options.body);
    assert.equal(payload.service_id, CREDS.serviceId);
    assert.equal(payload.template_id, CREDS.templateId);
    assert.equal(payload.user_id, CREDS.publicKey);
    assert.equal(payload.accessToken, CREDS.privateKey);
    assert.equal(payload.template_params.from_email, "visitor@example.com");
    assert.equal(payload.template_params.reply_to, "visitor@example.com");
    assert.equal(payload.template_params.message, "a valid message here");
});

test("sendEmail throws when EmailJS responds with a non-OK status", async () => {
    const fetchImpl = makeFetch({ ok: false, status: 403, body: "API calls are disabled" });
    const sendEmail = createEmailJsMailer({ ...CREDS, fetchImpl });

    await assert.rejects(
        () => sendEmail({ email: "visitor@example.com", message: "a valid message here" }),
        (err) => {
            assert.match(err.message, /EmailJS send failed \(403\)/);
            assert.equal(err.status, 403);
            return true;
        }
    );
});
