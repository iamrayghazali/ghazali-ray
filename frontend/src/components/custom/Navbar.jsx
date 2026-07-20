import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button.jsx";
import { ThemeToggle } from "@/components/custom/ThemeToggle.jsx";
import { Highlighter } from "@/components/ui/highlighter";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.jsx";

const GITHUB = "https://github.com/iamrayghazali";
const LINKEDIN = "https://www.linkedin.com/in/raydan-ghazali/";

const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
];

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};
const listVariants = {
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const linkVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const go = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    const hidden = useScrollDirection();

    useEffect(() => {
        if (!menuOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
                ${hidden ? "-translate-y-full" : "translate-y-0"} gradient-blur border-b-1 w-full md:max-w-lg h-14 md:rounded-b-lg mx-auto`}
                style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
                <div className="mx-auto p-2">
                    <div className="hidden md:flex flex-row items-center justify-around gap-5 rounded-none">
                        <h1 className="font-black leading-[0.95] tracking-tight text-2xl cursor-pointer" onClick={() => navigate("/")}>
                            Ray{" "}
                            <Highlighter action="underline" color="#f97316" iterations={3} animationDuration={1500}>
                                Ghazali
                            </Highlighter>
                        </h1>
                        <div className="flex gap-2">
                            <Button size="lg" variant={pathname === "/" ? "" : "ghost"} onClick={() => navigate("/")}>
                                Home
                            </Button>
                            <Button size="lg" variant={pathname === "/" ? "ghost" : ""} onClick={() => navigate("/contact")}>
                                Contact
                            </Button>
                        </div>

                        <div className="flex flex-row gap-5">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Links</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-34 gap-4">
                                                <Button className="w-full" size="lg" variant="secondary" onClick={() => window.open(GITHUB, "_blank")}>
                                                    <FaGithub size={25}/> GitHub
                                                </Button>
                                                <Separator className="my-1" />
                                                <Button className="w-full" size="lg" variant="secondary" onClick={() => window.open(LINKEDIN, "_blank")}>
                                                    <FaLinkedin size={25}/> LinkedIn
                                                </Button>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <AnimatedThemeToggler duration={600}/>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center justify-between mt-2">
                        <h1 className="font-black leading-[0.95] tracking-tight text-2xl">
                            Ray{" "}
                            <Highlighter action="underline" color="#f97316" iterations={3} animationDuration={1500}>
                                Ghazali
                            </Highlighter>
                        </h1>
                        <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="menu"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-[60] flex flex-col bg-background/90 backdrop-blur-2xl md:hidden"
                    >
                        <div
                            className="flex items-center justify-between px-6 h-14"
                            style={{ paddingTop: "env(safe-area-inset-top)" }}
                        >
                            <span className="font-black tracking-tight text-lg">Ray Ghazali</span>
                            <Hamburger open onClick={() => setMenuOpen(false)} />
                        </div>

                        <motion.nav
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-1 flex-col justify-center gap-6 px-8"
                        >
                            {NAV_LINKS.map((item, i) => {
                                const active = pathname === item.path;
                                return (
                                    <motion.button
                                        key={item.path}
                                        variants={linkVariants}
                                        onClick={() => go(item.path)}
                                        className="group flex items-center gap-5 text-left"
                                    >
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span
                                            className={cn(
                                                "text-5xl font-semibold tracking-tight transition-colors duration-300",
                                                active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                        {active && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
                                    </motion.button>
                                );
                            })}
                        </motion.nav>

                        <motion.div
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-between border-t border-border/60 px-8 py-8"
                            style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
                        >
                            <div className="flex items-center gap-6 text-muted-foreground">
                                <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
                                    <FaGithub size={22} />
                                </a>
                                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
                                    <FaLinkedin size={22} />
                                </a>
                            </div>
                            <ThemeToggle />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function Hamburger({ open, onClick }) {
    return (
        <motion.button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={onClick}
            whileTap={{ scale: 0.9 }}
            className="relative flex h-10 w-10 items-center justify-center text-foreground"
        >
            <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute h-[1.5px] w-6 rounded-full bg-current"
            />
            <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute h-[1.5px] w-6 rounded-full bg-current"
            />
        </motion.button>
    );
}
