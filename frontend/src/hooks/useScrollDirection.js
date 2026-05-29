import { useEffect, useRef, useState } from "react";

export function useScrollDirection() {
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            // only hide after scrolling 60px down from top
            if (y < 60) { setHidden(false); lastY.current = y; return; }
            setHidden(y > lastY.current);
            lastY.current = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return hidden;
}