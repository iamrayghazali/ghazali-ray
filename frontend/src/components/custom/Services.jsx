import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FiVideo, FiTrendingUp, FiShare2, FiFeather, FiGlobe, FiArrowUpRight } from "react-icons/fi";
import { BlurFade } from "@/components/ui/blur-fade.jsx";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button.jsx";

const offerings = [
    {
        Icon: FiGlobe,
        title: "Full websites",
        desc: "Frontend, backend, hosting & domain — end to end.",
    },
    { Icon: FiVideo, title: "Video editing", desc: "Reels, promos and punchy edits." },
    { Icon: FiTrendingUp, title: "SEO optimization", desc: "Fast, structured, rank-ready pages." },
    { Icon: FiShare2, title: "Social media", desc: "Consistent content and presence." },
    { Icon: FiFeather, title: "Branding", desc: "Logos, palettes and a cohesive identity." },
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};
const row = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
    const navigate = useNavigate();

    return (
        <section
            id="services"
            className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-24"
        >
            <BlurFade delay={0.15} inView>
                <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-foreground/25" />
                    <span className="font-mono text-[11px] uppercase tracking-[.22em] text-muted-foreground">
                        What I offer
                    </span>
                </div>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground text-shadow sm:text-5xl">
                    What I can do for you
                </h2>
            </BlurFade>

            <motion.ul
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-10 divide-y divide-border/60 border-y border-border/60"
            >
                {offerings.map(({ Icon, title, desc }) => (
                    <motion.li
                        key={title}
                        variants={row}
                        className="group flex items-center gap-4 py-5"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-muted-foreground transition-colors group-hover:text-foreground">
                            <Icon className="h-5 w-5" />
                        </span>

                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-foreground">{title}</h3>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>

                        <FiArrowUpRight className="h-4 w-4 shrink-0 text-transparent transition-colors duration-300 group-hover:text-muted-foreground" />
                    </motion.li>
                ))}
            </motion.ul>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex justify-center"
            >
                <InteractiveHoverButton onClick={() => navigate("/contact")}>
                    Let&apos;s work together
                </InteractiveHoverButton>
            </motion.div>
        </section>
    );
}
