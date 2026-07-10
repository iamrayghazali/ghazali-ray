import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { isValidEmail, isValidMessage } from "./lib/validation.js";

export function createApp({
    sendEmail,
    frontendUrl,
    cooldownMs = 2 * 60 * 60 * 1000,
    rateLimitWindowMs = 15 * 60 * 1000,
    rateLimitMax = 5,
    trustProxy = 1,
} = {}) {
    if (typeof sendEmail !== "function") {
        throw new Error("createApp requires a `sendEmail` function");
    }

    const app = express();

    app.set("trust proxy", trustProxy);
    app.disable("x-powered-by");

    const allowedOrigins = (frontendUrl || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    app.use(
        cors({
            origin(origin, cb) {
                if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
                return cb(new Error("CORS_FORBIDDEN"));
            },
            methods: ["GET", "POST"],
        })
    );

    app.use(helmet());
    app.use(express.json({ limit: "10kb" }));

    app.use((err, req, res, next) => {
        if (err?.type === "entity.too.large") {
            return res.status(413).json({ error: "Payload too large.", code: "PAYLOAD_TOO_LARGE" });
        }
        if (err?.type === "entity.parse.failed" || err instanceof SyntaxError) {
            return res.status(400).json({ error: "Invalid JSON body.", code: "INVALID_JSON" });
        }
        return next(err);
    });

    const emailSentAt = new Map();

    const pruneExpired = () => {
        const now = Date.now();
        for (const [ip, ts] of emailSentAt) {
            if (now - ts > cooldownMs) emailSentAt.delete(ip);
        }
    };

    const limiter = rateLimit({
        windowMs: rateLimitWindowMs,
        max: rateLimitMax,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            error: "Too many requests. Please wait before trying again.",
            code: "RATE_LIMITED",
        },
    });

    app.get("/", (req, res) => {
        res.json({ message: "Backend running", status: "ok" });
    });

    app.get("/health", (req, res) => {
        res.json({ status: "ok" });
    });

    app.post("/contact", limiter, async (req, res) => {
        const ip = req.ip;
        const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
        const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email address.", code: "INVALID_EMAIL" });
        }
        if (!isValidMessage(message)) {
            return res.status(400).json({
                error: "Message must be between 10 and 2000 characters.",
                code: "INVALID_MESSAGE",
            });
        }

        pruneExpired();

        if (emailSentAt.has(ip)) {
            const remaining = cooldownMs - (Date.now() - emailSentAt.get(ip));
            if (remaining > 0) {
                const hours = Math.floor(remaining / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const timeStr =
                    hours > 0
                        ? `${hours}h ${minutes}m`
                        : `${minutes} minute${minutes !== 1 ? "s" : ""}`;

                return res.status(429).json({
                    error: `You've already sent a message. Please try again in ${timeStr}.`,
                    code: "COOLDOWN_ACTIVE",
                    retryAfterMs: remaining,
                });
            }
        }

        try {
            await sendEmail({ email, message });
            emailSentAt.set(ip, Date.now());
            return res.status(200).json({ message: "Email sent successfully.", code: "SUCCESS" });
        } catch (err) {
            console.error("Email send failed:", err);
            return res.status(500).json({
                error: "Failed to send email. Please try again later.",
                code: "SEND_FAILED",
            });
        }
    });

    app.use((req, res) => {
        res.status(404).json({ error: "Not found.", code: "NOT_FOUND" });
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        if (err?.message === "CORS_FORBIDDEN") {
            return res.status(403).json({ error: "Origin not allowed.", code: "CORS_FORBIDDEN" });
        }
        console.error("Unhandled error:", err);
        return res.status(500).json({ error: "Internal server error.", code: "INTERNAL_ERROR" });
    });

    return app;
}
