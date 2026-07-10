import dotenv from "dotenv";

import { createApp } from "./app.js";
import { createEmailJsMailer } from "./lib/mailer.js";

dotenv.config();

const REQUIRED = [
    "EMAILJS_SERVICE_ID",
    "EMAILJS_TEMPLATE_ID",
    "EMAILJS_PUBLIC_KEY",
    "EMAILJS_PRIVATE_KEY",
    "FRONTEND_URL",
];
const missing = REQUIRED.filter((key) => !process.env[key]);
if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
}

const sendEmail = createEmailJsMailer({
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

const app = createApp({ sendEmail, frontendUrl: process.env.FRONTEND_URL });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
