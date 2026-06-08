import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import BrowserMockup from "@/components/custom/BrowserMockup.jsx";

const PROJECTS = [
    {
        id: 1,
        title: "But Make It Smart",
        description: "A webshop that sells NFC-based smart items like business cards.",
        url: "https://github.com/iamrayghazali/ButMakeItSmart",
        src: "/assets/project-showcase/butmakeitsmart-desktop.png",
        tag: "Frontend",
    },
    {
        id: 2,
        title: "Camera101",
        description: "A paid service to learn interactively how to use multiple camera types, even your iPhone. Simulators included.",
        url: "https://github.com/iamrayghazali/camera101",
        src: "/assets/project-showcase/camera101-desktop.png",
        tag: "Fullstack",
    },
    {
        id: 3,
        title: "VIPRENT",
        description: "A luxury and sport car rental company based in Budapest.",
        url: "https://github.com/iamrayghazali/VIPRENT",
        src: "/assets/project-showcase/viprent-desktop-cars.png",
        tag: "Fullstack",
    },
    {
        id: 4,
        title: "Vibe Atlas",
        description: "A smart travel suggestor using user preferences and AI to generate curated destination suggestions.",
        url: "https://github.com/iamrayghazali/VibeAtlas2",
        src: "/assets/project-showcase/vibeatlas-desktop.png",
        tag: "Fullstack",
    },
];

// desktop: (n-1) * (cardVw + gapVw) = 3 * (50 + 2) = 156
// mobile:  (n-1) * (cardVw + gapVw) = 3 * (82 + 2) = 252
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

                {/* DESKTOP */}
                <motion.div
                    style={{ x: xDesktop }}
                    className="hidden md:flex gap-8 pl-[8vw] will-change-transform"
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    <div className="w-[30vw] shrink-0" />
                </motion.div>

                {/* MOBILE */}
                <motion.div
                    style={{ x: xMobile }}
                    className="flex md:hidden gap-5 pl-[6vw] will-change-transform"
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} mobile />
                    ))}
                    <div className="w-[30vw] shrink-0" />
                </motion.div>

            </div>
        </div>
    );
}

function ProjectCard({ project, mobile }) {

    const shortUrl = project.url.split("//")[1];

    return (
        <div
            className={cn(
                "flex flex-col gap-4 shrink-0",
                mobile ? "w-[82vw]" : "w-[50vw] max-w-2xl"
            )}
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
        </div>
    );
}