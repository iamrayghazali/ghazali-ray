export default function BackgroundFX() {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background"
        >
            <div
                className="absolute inset-0 text-foreground/[0.07]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-transparent to-background/50" />
        </div>
    );
}
