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
                    <p className="mb-4 text-xs tracking-[0.3em] text-muted-foreground uppercase text-shadow">
                        Full Stack Developer
                    </p>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.95] tracking-tight text-foreground text-center text-shadow">
                        Hi, I'm Ray
                    </h1>
                </motion.div>

                <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>

        </section>
    );
}