import { buildTemplateParams } from "./validation.js";

export const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export function createEmailJsMailer({
    serviceId,
    templateId,
    publicKey,
    privateKey,
    fetchImpl = fetch,
}) {
    if (!serviceId) throw new Error("createEmailJsMailer requires a serviceId");
    if (!templateId) throw new Error("createEmailJsMailer requires a templateId");
    if (!publicKey) throw new Error("createEmailJsMailer requires a publicKey");
    if (!privateKey) throw new Error("createEmailJsMailer requires a privateKey (accessToken)");

    return async function sendEmail({ email, message }) {
        const res = await fetchImpl(EMAILJS_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                accessToken: privateKey,
                template_params: buildTemplateParams({ email, message }),
            }),
        });

        if (!res.ok) {
            const detail = await res.text().catch(() => "");
            const err = new Error(`EmailJS send failed (${res.status}): ${detail}`);
            err.status = res.status;
            throw err;
        }
    };
}
