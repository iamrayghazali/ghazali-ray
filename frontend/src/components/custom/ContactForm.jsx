import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { FaLinkedin } from "react-icons/fa";
import { CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner.jsx";
import { useState, useMemo } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field.jsx";
import { Separator } from "@/components/ui/separator";
import { validateEmail } from "@/lib/validateEmail";
import {useNavigate} from "react-router-dom";

const SERVER_ERRORS = {
    RATE_LIMITED:    "Too many attempts. Wait 15 minutes.",
    COOLDOWN_ACTIVE: null,
    INVALID_EMAIL:   "Invalid email address.",
    INVALID_MESSAGE: "Message too short or too long.",
    SEND_FAILED:     "Something went wrong on our end. Try again later.",
};

export default function ContactForm() {
    const navigate = useNavigate();
    const [email, setEmail]               = useState("");
    const [message, setMessage]           = useState("");
    const [emailError, setEmailError]     = useState("");
    const [messageError, setMessageError] = useState("");
    const [submitting, setSubmitting]     = useState(false);
    const [submitted, setSubmitted]       = useState(false);
    const [serverError, setServerError]   = useState("");

    const canSend = useMemo(() => {
        const emailOk   = email.trim().length > 0;
        const messageOk = message.trim().length >= 10;
        return emailOk && messageOk && !submitting && !submitted;
    }, [email, message, submitting, submitted]);

    const handleEmailBlur = () => {
        const error = validateEmail(email);
        setEmailError(error || "");
    };

    const handleMessageBlur = () => {
        if (!message.trim()) {
            setMessageError("Message is required.");
        } else if (message.trim().length < 10) {
            setMessageError("Message must be at least 10 characters.");
        } else if (message.trim().length > 2000) {
            setMessageError("Message must be under 2000 characters.");
        } else {
            setMessageError("");
        }
    };

    const handleSubmit = async () => {
        const emailErr   = validateEmail(email);
        const messageErr = !message.trim()
            ? "Message is required."
            : message.trim().length < 10
                ? "Message must be at least 10 characters."
                : message.trim().length > 2000
                    ? "Message must be under 2000 characters."
                    : null;

        if (emailErr)   setEmailError(emailErr);
        if (messageErr) setMessageError(messageErr);
        if (emailErr || messageErr) return;

        setSubmitting(true);
        setServerError("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), message: message.trim() }),
            });

            const data = await res.json();

            if (!res.ok) {
                const msg = data.code === "COOLDOWN_ACTIVE"
                    ? data.error
                    : SERVER_ERRORS[data.code] || data.error || "Something went wrong.";
                setServerError(msg);
                return;
            }

            setSubmitted(true);

        } catch {
            setServerError("Could not reach the server. Check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Card className="w-full max-w-sm mt-10">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-lg">Message sent!</CardTitle>
                    <CardDescription>
                        Thanks for reaching out. I'll get back to you soon.
                    </CardDescription>
                    <Button variant="secondary" className="mt-5" onClick={() => navigate("/")}>Back to the portfolio ↗</Button>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-sm mt-10">
            <CardHeader>
                <CardTitle className="text-lg">Send a message</CardTitle>
                <CardDescription>
                    Send me an email here or shoot a message on{" "}
                    <a href="https://www.linkedin.com/in/raydan-ghazali/" target="_blank" rel="noopener noreferrer" className="text-accent">LinkedIn</a>
                </CardDescription>
                <CardAction>
                    <a href="https://www.linkedin.com/in/raydan-ghazali/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={20} className="text-accent" />
                    </a>
                </CardAction>
            </CardHeader>

            <Separator />

            <CardContent>
                <div className="flex flex-col gap-2">

                    <Field >
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailBlur}
                            disabled={submitting}
                            data-invalid={!!emailError || undefined}
                            className={`${emailError ? "border-destructive" : ""}`}
                        />
                        {emailError && <FieldDescription className="text-destructive">{emailError}</FieldDescription>}
                    </Field>

                    <Field >
                        <FieldLabel htmlFor="message">Message</FieldLabel>
                        <Textarea
                            id="message"
                            rows={4}
                            placeholder="Start typing..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onBlur={handleMessageBlur}
                            disabled={submitting}
                            data-invalid={!!messageError || undefined}
                        />
                        {messageError && <FieldDescription className="text-destructive">{messageError}</FieldDescription>}
                        <p className="text-right text-[10px] text-muted-foreground">
                            {message.length} / 2000
                        </p>
                    </Field>

                </div>
            </CardContent>

            <CardAction className="mx-auto">

                <CardFooter className="flex flex-col gap-2">
                    <Button
                        className={`min-w-20 ${canSend ? "" : "cursor-not-allowed"}`}
                        variant="secondary"
                        disabled={!canSend}
                        onClick={handleSubmit}
                    >
                        {submitting
                            ? <><Spinner className="size-3" /> Sending...</>
                            : "Send"
                        }
                    </Button>
                    {serverError && (
                        <p className="text-xs text-destructive rounded-md bg-destructive/10 px-3 py-2">
                            {serverError}
                        </p>
                    )}
                </CardFooter>
            </CardAction>
        </Card>
    );
}