import { motion } from "motion/react";
import { MdBrush, MdCode } from "react-icons/md";
import { BiServer } from "react-icons/bi";
import { GoProjectRoadmap } from "react-icons/go";
import { FiMail, FiArrowUpRight } from "react-icons/fi";
import { DotPattern } from "@/components/ui/dot-pattern.jsx";
import { cn } from "@/lib/utils.js";
import { BlurFade } from "@/components/ui/blur-fade.jsx";
import { ScrollVelocityRow } from "@/components/ui/scroll-based-velocity.jsx";
import { PROJECTS } from "@/providers/projects-provider.js";
import IphoneNotification from "@/components/custom/IphoneNotification.jsx";
import favicon from "../../../public/assets/gmail.svg";

const features = [
    {
        Icon: MdCode,
        name: "Projects",
        description: "Check out what I've been building on GitHub.",
        href: "https://github.com/iamrayghazali",
        cta: "See my projects",
        external: true,
        interactive: true,
        background: (
            <div className="flex h-full min-h-28 items-center overflow-hidden py-3 lg:min-h-0">
                <ScrollVelocityRow
                    baseVelocity={5}
                    direction={1}
                    scrollReactivity={false}
                    className="opacity-70 dark:opacity-40"
                >
                    {PROJECTS.map((project) => (
                        <img
                            key={project.id}
                            src={project.src}
                            alt="Project preview"
                            loading="lazy"
                            decoding="async"
                            className="mr-4 max-h-20 rounded-lg transform-gpu"
                        />
                    ))}
                </ScrollVelocityRow>
            </div>
        ),
        className: "lg:col-span-2 lg:row-start-1",
    },
    {
        Icon: MdBrush,
        name: "Design",
        description: "Interfaces that feel as good as they look.",
        interactive: false,
        background: <DesignMockup />,
        className: "lg:col-start-3 lg:row-start-1 lg:row-span-3",
    },
    {
        Icon: BiServer,
        name: "Back End",
        description: "APIs, databases, and everything in between.",
        interactive: false,
        background: <CornerIcon Icon={BiServer} />,
        className: "lg:col-start-1 lg:row-start-2",
    },
    {
        Icon: GoProjectRoadmap,
        name: "Front End",
        description: "React, motion, and pixel-perfect polish.",
        interactive: false,
        background: <CornerIcon Icon={GoProjectRoadmap} />,
        className: "lg:col-start-2 lg:row-start-2",
    },
    {
        Icon: FiMail,
        name: "Contact",
        description: "Have an idea or a role in mind? Let's talk.",
        href: "/contact",
        cta: "Contact me",
        external: false,
        interactive: true,
        background: (
            <div className="relative flex min-h-28 justify-center pt-3 lg:h-full lg:min-h-0 lg:items-center">
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
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-3",
    },
];

export default function Bento() {
    return (
        <div
            id="bento"
            className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-20"
        >
            <BlurFade delay={0.2} inView className="w-full">
                <h1 className="p-4 text-4xl font-extrabold tracking-tight text-foreground text-shadow sm:text-5xl md:text-6xl">
                    Quick access
                </h1>

                <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[12rem]">
                    {features.map((feature, i) => (
                        <Card key={feature.name} feature={feature} index={i} />
                    ))}
                </div>
            </BlurFade>
        </div>
    );
}

function Card({ feature, index }) {
    const { Icon, name, description, href, cta, external, interactive, background, className } =
        feature;

    const linkProps = external
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : { href };

    return (
        <motion.div
            className={cn(
                "group relative flex min-h-40 flex-col overflow-hidden rounded-2xl transform-gpu",
                "border border-border/60 bg-background",
                "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "dark:border-white/10 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                "transition-[box-shadow,border-color] duration-300",
                "hover:border-accent/50 hover:shadow-[0_8px_40px_-8px_rgba(249,115,22,0.35)]",
                className
            )}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
        >
            {/* Background visual — sits behind the content, blurs on hover */}
            <div className="relative flex-1 transition-[filter] duration-500 group-hover:blur-sm lg:absolute lg:inset-0 lg:flex-none">
                {background}
            </div>

            {/* Readability scrim so the title stays legible over busy backgrounds (lg only) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent lg:block"
            />

            {/* Content — anchored to the bottom on lg, grows upward as the description reveals */}
            <div className="pointer-events-none relative z-20 flex flex-col gap-1 p-4 lg:absolute lg:inset-x-0 lg:bottom-0">
                <Icon className="mb-1 hidden h-11 w-11 origin-left transform-gpu text-neutral-700 transition-colors duration-300 group-hover:text-accent dark:text-white md:block" />

                <h3 className="text-2xl font-semibold text-neutral-800 text-shadow dark:text-white">
                    {name}
                </h3>

                {/* Collapsible reveal: expanded on small screens, reveals on hover at lg */}
                <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                    <div className="flex flex-col gap-2 overflow-hidden">
                        <p className="max-w-lg text-sm text-muted-foreground">{description}</p>

                        {interactive && cta && (
                            <a
                                {...linkProps}
                                className="pointer-events-auto inline-flex w-fit items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-foreground"
                            >
                                {cta}
                                <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CornerIcon({ Icon }) {
    return (
        <div className="flex items-center justify-end p-2 md:hidden">
            <Icon className="text-6xl text-neutral-700 opacity-70 dark:text-white dark:opacity-40" />
        </div>
    );
}

function DesignMockup() {
    return (
        <div className="relative flex h-full min-h-56 w-full items-center justify-center overflow-hidden py-8 lg:min-h-0">
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
