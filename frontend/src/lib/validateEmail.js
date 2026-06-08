export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.trim()) return "Email is required.";
    if (!emailRegex.test(email.trim())) return "Enter a valid email address.";
    return null;
}
