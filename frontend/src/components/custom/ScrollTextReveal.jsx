import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "motion/react";


export default function ScrollTextReveal({label, title, description, logos, first, index = 0, total = 1}) {
    const containerRef = useRef(null);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start center", "end end"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [40, 0, 0, -40]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.94, 1, 1, 0.96]);

    const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

    return (

        <div ref={containerRef} className={`relative h-[160vh] -mb[40vh] w-full bg-background`}>

            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
                <span className="pointer-events-none absolute top-10 right-6 sm:right-10 font-mono text-[11px] tracking-[.2em] text-muted-foreground/50">
                    {counter}
                </span>
                <motion.div
                    style={{opacity, y, scale}}
                    className="absolute mx-auto max-w-4xl text-center will-change-[transform,opacity]"
                >
                    <span className="font-mono text-[11px] tracking-[.22em] uppercase text-accent text-shadow">
                        {label}
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-shadow">
                        {title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg font-normal text-muted-foreground px-5 sm:mt-6 sm:text-xl md:max-w-2xl md:text-2xl">
                        {description}
                    </p>
                    <motion.div
                        className="flex items-center justify-center max-w-lg mx-auto gap-5 md:gap-15 mt-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.6}}
                        variants={{
                            hidden: {},
                            visible: {transition: {staggerChildren: 0.08, delayChildren: 0.1}},
                        }}
                    >
                        {logos.map((logo, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: {opacity: 0, y: 16, scale: 0.7},
                                    visible: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.45, ease: [0.16, 1, 0.3, 1]}},
                                }}
                                whileHover={{scale: 1.12, transition: {duration: 0.2}}}
                                whileTap={{scale: 0.92}}
                            >
                                {logo}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
