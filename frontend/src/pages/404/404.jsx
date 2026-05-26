import { Link } from "react-router-dom";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function NotFoundPage() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">

            <div className="relative z-10 text-center">

                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Error 404
                </p>

                <h1 className="text-7xl font-black tracking-tight sm:text-8xl md:text-9xl">
                    Lost?
                </h1>

                <p className="mx-auto mt-6 max-w-md text-muted-foreground">
                    The page you are looking for does not exist
                    or has been moved somewhere else.
                </p>

                <div className="mt-10 flex justify-center">
                    <Link to="/">
                        <InteractiveHoverButton>
                            Back Home
                        </InteractiveHoverButton>
                    </Link>
                </div>

            </div>
        </section>
    );
}