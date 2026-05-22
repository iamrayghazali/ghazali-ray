import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <AnimatedThemeToggler duration={600} />
        </>
);
}