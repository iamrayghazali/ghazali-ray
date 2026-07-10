import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import BrowserMockup from "@/components/custom/BrowserMockup.jsx";
import { PROJECTS } from "@/providers/projects-provider.js";

const DESKTOP_TRANSLATE = "-156vw";
const MOBILE_TRANSLATE  = "-252vw";

const slideLeft = {
    hidden:  { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const slideLeftDelay = {
    hidden:  { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
};

export default function ProjectsScroll() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const xDesktop = useTransform(scrollYProgress, [0, 1], ["0vw", DESKTOP_TRANSLATE]);
    const xMobile  = useTransform(scrollYProgress, [0, 1], ["0vw", MOBILE_TRANSLATE]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${PROJECTS.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                <div className="px-6 lg:px-12 pb-8 overflow-hidden">
                    <motion.div
                        className="flex items-center gap-3"
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <span className="h-px w-10 bg-foreground/25" />
                        <span className="font-mono text-[11px] tracking-[.22em] uppercase text-muted-foreground">
                            Selected work
                        </span>
                    </motion.div>

                    <motion.h2
                        className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
                        variants={slideLeftDelay}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        Things I've made
                    </motion.h2>
                </div>

                <motion.div
                    style={{ x: xDesktop }}
                    className="hidden md:flex gap-8 pl-[8vw] will-change-transform"
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    <div className="w-[30vw] shrink-0" />
                </motion.div>

                <motion.div
                    style={{ x: xMobile }}
                    className="flex md:hidden gap-5 pl-[6vw] will-change-transform"
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} mobile />
                    ))}
                    <div className="w-[30vw] shrink-0" />
                </motion.div>

                <div className="flex justify-center gap-2 mt-8">
                    {PROJECTS.map((project, i) => (
                        <ProgressDot key={project.id} index={i} count={PROJECTS.length} progress={scrollYProgress} />
                    ))}
                </div>

            </div>
        </div>
    );
}

function ProgressDot({ index, count, progress }) {
    const active = useTransform(progress, [0, 1], [0, count - 1], { clamp: true });
    const distance = useTransform(active, (v) => Math.abs(v - index));

    const scale = useTransform(distance, [0, 0.5], [1.8, 1], { clamp: true });
    const opacity = useTransform(distance, [0, 0.5], [1, 0.3], { clamp: true });

    return (
        <motion.span
            style={{ scale, opacity }}
            className="h-1.5 w-1.5 rounded-full bg-foreground will-change-transform"
        />
    );
}

const cardEntrance = {
    hidden:  { opacity: 0, y: 24, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({ project, mobile }) {

    const shortUrl = project.url.split("//")[1];

    return (
        <motion.div
            className={cn(
                "flex flex-col gap-4 shrink-0",
                mobile ? "w-[82vw]" : "w-[50vw] max-w-2xl"
            )}
            variants={cardEntrance}
            initial="hidden"
            whileInView="visible"
            whileHover={mobile ? undefined : { y: -6, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, amount: 0.4 }}
        >
            <div
                className="w-full rounded-xl overflow-hidden shadow-xl shadow-black/15 border border-border/30"
                style={{ transform: "translateZ(0)" }}
            >
                <BrowserMockup
                    url={shortUrl}
                    imageSrc={project.src}
                />
            </div>

            <div className="flex items-start justify-between px-1">
                <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                        {project.tag}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-0.5">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                        {project.description}
                    </p>
                </div>

                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 ml-4 mt-1 font-mono text-xs text-accent hover:text-foreground transition-colors underline underline-offset-4"
                >
                    View ↗
                </a>
            </div>
        </motion.div>
    );
}