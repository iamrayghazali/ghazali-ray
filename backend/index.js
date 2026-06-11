import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(helmet());


app.use(express.json());

const emailSentAt = new Map();
const COOLDOWN_MS = 2000; // 2 hours

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiter — 5 requests per 15 min per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests. Please wait 15 minutes before trying again.",
        code: "RATE_LIMITED",
    },
});

const isValidEmail   = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim());
const isValidMessage = (msg)   => msg?.trim().length >= 10 && msg?.trim().length <= 2000;
const escapeHtml = (str) => str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

app.get("/", (req, res) => {
    res.json({ message: "Backend running" });
});

app.post("/contact", limiter, async (req, res) => {
    const ip      = req.ip;
    const { email, message } = req.body;

    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email address.", code: "INVALID_EMAIL" });
    }
    if (!message || !isValidMessage(message)) {
        return res.status(400).json({ error: "Message must be between 10 and 2000 characters.", code: "INVALID_MESSAGE" });
    }

    // Cooldown check
    if (emailSentAt.has(ip)) {
        const elapsed   = Date.now() - emailSentAt.get(ip);
        const remaining = COOLDOWN_MS - elapsed;

        if (remaining > 0) {
            const hours   = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} minute${minutes !== 1 ? "s" : ""}`;

            return res.status(429).json({
                error: `You've already sent a message. Please try again in ${timeStr}.`,
                code: "COOLDOWN_ACTIVE",
                retryAfterMs: remaining,
            });
        }
    }

    try {
        await resend.emails.send({
            from:    "Portfolio Contact <onboarding@resend.dev>",
            to:      process.env.YOUR_EMAIL,
            subject: `New message from ${email}`,
            text:    `From: ${email}\n\n${message}`,
            html:    `<p><strong>From:</strong> ${escapeHtml(email)}</p><hr /><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
        });

        emailSentAt.set(ip, Date.now());

        return res.status(200).json({ message: "Email sent successfully.", code: "SUCCESS" });

    } catch (err) {
        console.error("Resend error:", err);
        return res.status(500).json({ error: "Failed to send email. Please try again later.", code: "SEND_FAILED" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});