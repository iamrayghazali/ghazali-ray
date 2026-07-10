import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useMotionTemplate,
    useSpring,
    useTransform,
} from "motion/react";
import { MdBrush, MdCode } from "react-icons/md";
import { BiServer } from "react-icons/bi";
import { GoProjectRoadmap } from "react-icons/go";
import { FiMail, FiArrowUpRight } from "react-icons/fi";
import { DotPattern } from "@/components/ui/dot-pattern.jsx";
import { cn } from "@/lib/utils.js";
import { BlurFade } from "@/components/ui/blur-fade.jsx";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity.jsx";
import { PROJECTS } from "@/providers/projects-provider.js";
import IphoneNotification from "@/components/custom/IphoneNotification.jsx";
import favicon from "../../../public/assets/gmail.svg";

const features = [
    {
        Icon: FiMail,
        name: "Contact",
        description: "Have an idea or a role in mind? Let's talk.",
        href: "/contact",
        cta: "Contact me",
        external: false,
        background: (
            <div className="relative flex min-h-24 justify-center pt-2 lg:min-h-0">
                <BlurFade blur="6px" delay={0.35} inView className="flex w-full justify-center">
                    <IphoneNotification
                        icon={favicon}
                        title="Ray Ghazali"
                        message="Hey! Let's talk"
                        className="left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0"
                    />
                </BlurFade>
            </div>
        ),
        className: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: MdCode,
        name: "Projects",
        description: "Check out what I've been building on GitHub.",
        href: "https://github.com/iamrayghazali",
        cta: "See my projects",
        external: true,
        background: (
            <div className="relative min-h-24 lg:min-h-0">
                <ScrollVelocityContainer className="dark:opacity-40 opacity-70 absolute md:top-8 top-3 left-0 text-4xl font-bold md:text-7xl -z-10">
                    <ScrollVelocityRow baseVelocity={5} direction={1}>
                        {PROJECTS.map((project) => (
                            <img
                                key={project.id}
                                src={project.src}
                                alt="Project preview"
                                loading="lazy"
                                decoding="async"
                                className="pr-5 max-h-20 rounded-lg transform-gpu blur-[0.5px] transition-all duration-300 ease-out hover:blur-none flex items-center justify-center"
                            />
                        ))}
                    </ScrollVelocityRow>
                </ScrollVelocityContainer>
            </div>
        ),
        className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: MdBrush,
        name: "Design",
        description: "Interfaces that feel as good as they look.",
        href: "https://github.com/iamrayghazali",
        cta: "See my projects",
        external: true,
        background: <DesignMockup />,
        className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4",
    },
    {
        Icon: GoProjectRoadmap,
        name: "Front End",
        description: "React, motion, and pixel-perfect polish.",
        href: "/",
        cta: "Back to top",
        external: false,
        background: (
            <div className="flex md:hidden items-center justify-end mt-2 mr-2">
                <GoProjectRoadmap className="text-6xl dark:opacity-40 opacity-70" />
            </div>
        ),
        className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
    {
        Icon: BiServer,
        name: "Back End",
        description: "APIs, databases, and everything in between.",
        href: "/",
        cta: "Back to top",
        external: false,
        background: (
            <div className="flex md:hidden items-center justify-end mt-2 mr-2">
                <BiServer className="text-6xl dark:opacity-40 opacity-70" />
            </div>
        ),
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
    },
];

export default function Bento() {
    return (
        <div
            id="bento"
            className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-20"
        >
            <BlurFade delay={0.2} inView className="w-full">
                <h1 className="p-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-shadow">
                    Quick access
                </h1>

                <div className="grid w-full grid-cols-1 gap-4 p-4 lg:auto-rows-[12rem] lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <TiltCard key={feature.name} feature={feature} index={i} />
                    ))}
                </div>
            </BlurFade>
        </div>
    );
}

function TiltCard({ feature, index }) {
    const { Icon, name, description, href, cta, external, background, className } = feature;

    const ref = useRef(null);

    const nx = useMotionValue(0.5);
    const ny = useMotionValue(0.5);
    const px = useMotionValue(0);
    const py = useMotionValue(0);

    const rotateX = useSpring(useTransform(ny, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(nx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

    const spotlight = useMotionTemplate`radial-gradient(340px circle at ${px}px ${py}px, rgba(249,115,22,0.18), transparent 70%)`;

    const handleMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        nx.set(x / rect.width);
        ny.set(y / rect.height);
        px.set(x);
        py.set(y);
    };

    const handleLeave = () => {
        nx.set(0.5);
        ny.set(0.5);
    };

    const linkProps = external
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : { href };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            className={cn(
                "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl min-h-40 transform-gpu",
                "bg-background border border-border/60",
                "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:border-white/10",
                "transition-[box-shadow,border-color] duration-300",
                "hover:border-accent/50 hover:shadow-[0_8px_40px_-8px_rgba(249,115,22,0.35)]",
                className
            )}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div
                aria-hidden
                style={{ background: spotlight }}
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="transition-all duration-700 group-hover:blur-sm">{background}</div>

            <div className="relative z-20 py-2 px-4">
                <div className="pointer-events-none flex transform-gpu flex-col gap-1 transition-all duration-300 lg:translate-y-5 lg:group-hover:-translate-y-10">
                    <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:text-accent dark:text-white hidden md:flex" />
                    <h3 className="text-2xl font-semibold text-neutral-700 transform-gpu transition-all duration-300 ease-in-out dark:text-white text-shadow">
                        {name}
                    </h3>
                    <p className="max-w-lg w-full text-neutral-400 transition-all duration-300 lg:translate-y-10 lg:transform-gpu lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                        {description}
                    </p>
                </div>
            </div>

            <div className="relative z-20 flex w-full transform-gpu items-center px-4 py-3 transition-all duration-300 lg:absolute lg:bottom-0 lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                <a
                    {...linkProps}
                    className="pointer-events-auto inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-foreground"
                >
                    {cta}
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
            </div>
        </motion.div>
    );
}

function DesignMockup() {
    return (
        <div className="relative flex min-h-56 w-full items-center justify-center overflow-hidden py-8 lg:min-h-[22rem]">
            <DotPattern
                glow={true}
                className={cn(
                    "mask-[radial-gradient(300px_circle_at_center,white,transparent)] opacity-60 dark:opacity-30"
                )}
            />
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-44 rounded-xl border border-border bg-card/80 p-3 shadow-xl backdrop-blur"
            >
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 rounded-full bg-accent/70" />
                    <div className="flex-1 space-y-1.5">
                        <div className="h-2 w-3/4 rounded-full bg-foreground/25" />
                        <div className="h-2 w-1/2 rounded-full bg-foreground/15" />
                    </div>
                </div>

                <div className="mt-3 space-y-1.5">
                    <div className="h-2 w-full rounded-full bg-foreground/10" />
                    <div className="h-2 w-5/6 rounded-full bg-foreground/10" />
                    <div className="h-2 w-4/6 rounded-full bg-foreground/10" />
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="h-6 w-16 rounded-md bg-accent" />
                    <div className="flex gap-1">
                        <span className="h-3 w-3 rounded-full bg-accent" />
                        <span className="h-3 w-3 rounded-full bg-accent/60" />
                        <span className="h-3 w-3 rounded-full bg-foreground/30" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
