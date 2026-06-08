import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";


export default function ScrollTextReveal({label, title, description, logos, first}) {
    const containerRef = useRef(null);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start center", "end end"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [40, 0, 0, -40]);

    return (

        <div ref={containerRef} className={`relative h-[160vh] -mb[40vh] w-full bg-background`}>

            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
                <motion.div
                    style={{opacity: opacity, y: y }}
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
                    <div className="flex items-center justify-center max-w-lg mx-auto gap-5 md:gap-15 mt-20">
                        {logos.map((logo, index) => (
                            <div key={index}>
                                {logo}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
