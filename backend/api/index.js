import dotenv from "dotenv";

import { createApp } from "../app.js";
import { createEmailJsMailer } from "../lib/mailer.js";

dotenv.config();

const sendEmail = createEmailJsMailer({
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

const app = createApp({ sendEmail, frontendUrl: process.env.FRONTEND_URL });

export default app;
