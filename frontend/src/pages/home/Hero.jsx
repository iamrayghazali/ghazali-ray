import { Link } from "react-router-dom";

import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {LightRays} from "@/components/ui/light-rays.jsx";
import {TypingAnimation} from "@/components/ui/typing-animation.jsx";

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden  text-foreground">
            {/* Content */}
            <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 sm:px-10">

                <div className="max-w-4xl">


                    <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl xl:text-[9rem]">
                        Ray {" "}
                        <Highlighter action="underline" color="#f97316" iterations={3} animationDuration={1500}>
                            Ghazali
                        </Highlighter>
                    </h1>
                    <p className="mb-6 text-sm tracking-[0.3em] text-muted-foreground uppercase">
                        <TypingAnimation startOnView cursorStyle="underscore">
                        Full Stack Developer

                        </TypingAnimation>
                    </p>

                    <div className="mt-10">
                        <Link to="/contact">
                            <InteractiveHoverButton>
                                Let&apos;s Talk
                            </InteractiveHoverButton>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-background to-transparent" />

        </section>
    );
}