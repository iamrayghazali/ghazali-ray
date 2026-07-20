import { motion, useScroll, useTransform } from "motion/react";


export default function BackgroundFX() {

    const { scrollYProgress } = useScroll();

    const yBlobA = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
    const yBlobB = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const yBlobC = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background"
        >
            <div
                className="absolute inset-0 text-foreground/[0.07]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* blob A — accent, upper left, drifts down slightly ── */}
            <motion.div
                style={{ y: yBlobA }}
                className="absolute -top-40 left-[8%] w-[480px] h-[480px] rounded-full
                           bg-primary/[0.07] dark:bg-primary/[0.09]
                           blur-2xl transform-gpu will-change-transform"
            />

            {/* blob B — neutral, mid right, drifts up ── */}
            <motion.div
                style={{ y: yBlobB }}
                className="absolute top-[42%] right-[4%] w-[560px] h-[560px] rounded-full
                           bg-foreground/[0.035] dark:bg-foreground/[0.05]
                           blur-2xl transform-gpu will-change-transform"
            />

            {/* blob C — accent, lower left, drifts up slightly ── */}
            <motion.div
                style={{ y: yBlobC }}
                className="absolute bottom-[5%] left-[28%] w-[420px] h-[420px] rounded-full
                           bg-primary/[0.06] dark:bg-primary/[0.08]
                           blur-2xl transform-gpu will-change-transform"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-transparent to-background/50" />
        </div>
    );
}