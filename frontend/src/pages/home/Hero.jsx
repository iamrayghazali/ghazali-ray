import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scale   = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
    const y       = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <section ref={containerRef} className="relative h-[140vh]">

            <div className="sticky top-0 h-screen overflow-hidden">

                <motion.div
                    style={{ scale, opacity, y }}
                    className="absolute inset-0 flex flex-col items-center justify-center pb-32 will-change-transform"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-4 text-xs tracking-[0.3em] text-muted-foreground uppercase text-shadow"
                    >
                        Full Stack Developer
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.95] tracking-tight text-foreground text-center text-shadow"
                    >
                        Hi, I'm Ray
                    </motion.h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="absolute bottom-10 left-0 flex w-full flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="h-8 w-px bg-gradient-to-b from-muted-foreground/60 to-transparent"
                    />
                </motion.div>

                <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>

        </section>
    );
}