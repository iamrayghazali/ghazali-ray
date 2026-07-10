import Navbar from "@/components/custom/Navbar.jsx";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal.jsx";
import ContactForm from "@/components/custom/ContactForm.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { TbCopy } from "react-icons/tb";
import { toast } from "sonner";
import { motion } from "motion/react";

const REVEAL_DELAY = 0.4;
const REVEAL_DURATION = 1.3;

export default function Contact() {
    const email = "ghazali.raydan@gmail.com";

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(email);
            toast.success("Copied!", { position: "bottom-right" });
        } catch {
            toast.error("Couldn't copy — try manually selecting it", { position: "bottom-right" });
        }
    };

    return (
        <section className="min-h-screen px-4">
            <Navbar />
            <div className="mx-auto flex w-full max-w-sm flex-col items-center pt-28 sm:pt-40">
                <DiaTextReveal
                    className="text-4xl font-bold tracking-tight text-shadow sm:text-5xl"
                    text="Let's talk"
                    delay={REVEAL_DELAY}
                    duration={REVEAL_DURATION}
                    colors={["#f97316"]}
                />

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: REVEAL_DELAY + REVEAL_DURATION,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex w-full flex-col items-center"
                >
                    <ContactForm />

                    <Separator className="mt-5 w-2/3" />

                    <div className="mt-10 flex w-full flex-col items-center">
                        <p className="mb-4 text-sm text-muted-foreground">Or copy my email</p>
                        <button
                            type="button"
                            onClick={copyText}
                            className="group flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-foreground/5"
                            aria-label={`Copy email address ${email}`}
                        >
                            <p className="text-sm text-gray-500 transition-colors group-hover:text-foreground">{email}</p>
                            <Separator className="h-6" orientation="vertical" />
                            <TbCopy className="text-gray-500 transition-colors group-hover:text-foreground" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
