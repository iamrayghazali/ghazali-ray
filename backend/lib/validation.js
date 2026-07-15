export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;
export const EMAIL_MAX = 254;

export function isValidEmail(email) {
    if (typeof email !== "string") return false;
    const trimmed = email.trim();
    return trimmed.length > 0 && trimmed.length <= EMAIL_MAX && EMAIL_RE.test(trimmed);
}

export function isValidMessage(msg) {
    if (typeof msg !== "string") return false;
    const len = msg.trim().length;
    return len >= MESSAGE_MIN && len <= MESSAGE_MAX;
}

export function buildTemplateParams({ email, message }, now = new Date()) {
    return {
        from: email,
        from_email: email,
        reply_to: email,
        subject: `New portfolio message from ${email}`,
        message,
        time: now.toUTCString(),
    };
}
