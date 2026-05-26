import { useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

function triggerThemeTransition(isDark, buttonEl) {
    const applyTheme = () => {
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", isDark ? "light" : "dark")
    }

    if (typeof document.startViewTransition !== "function") {
        applyTheme()
        return
    }

    const rect = buttonEl?.getBoundingClientRect()
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
    const maxRadius = Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy)
    )

    const transition = document.startViewTransition(() => flushSync(applyTheme))

    transition.ready.then(() => {
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${cx}px ${cy}px)`,
                    `circle(${maxRadius}px at ${cx}px ${cy}px)`,
                ],
            },
            {
                duration: 500,
                easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    })
}

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(
        () => document.documentElement.classList.contains("dark")
    )
    const lightRef = useRef(null)
    const darkRef = useRef(null)

    useEffect(() => {
        const obs = new MutationObserver(() =>
            setIsDark(document.documentElement.classList.contains("dark"))
        )
        obs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })
        return () => obs.disconnect()
    }, [])

    const toggle = (buttonEl) => {
        triggerThemeTransition(isDark, buttonEl)
        setIsDark((prev) => !prev)
    }

    return (
        <div className="relative flex items-center gap-0 rounded-md bg-muted p-1">
            <div
                className={cn(
                    "absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-md bg-background shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    isDark ? "left-[calc(50%+2px)]" : "left-1"
                )}
            />
            <button
                ref={lightRef}
                onClick={() => !isDark || toggle(lightRef.current)}
                className="relative z-10 flex w-[80px] items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors duration-300"
                style={{ color: !isDark ? "var(--foreground)" : "var(--muted-foreground)" }}
            >
                <Sun className="h-3.5 w-3.5" />
                Light
            </button>
            <button
                ref={darkRef}
                onClick={() => isDark || toggle(darkRef.current)}
                className="relative z-10 flex w-[80px] items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors duration-300"
                style={{ color: isDark ? "var(--foreground)" : "var(--muted-foreground)" }}
            >
                <Moon className="h-3.5 w-3.5" />
                Dark
            </button>
        </div>
    )
}