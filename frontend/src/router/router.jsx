import { createBrowserRouter, useLocation, useOutlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import App from "@/App";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";

const NotFoundPage = lazy(() => import("@/pages/404/404"));
const Contact = lazy(() => import("@/pages/contact/Contact"));

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function FrozenOutlet() {
    const outlet = useOutlet();
    const [frozen] = useState(outlet);
    return frozen;
}

function RootLayout() {
    const location = useLocation();

    return (
        <TooltipProvider>
            <ScrollToTop />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Suspense fallback={null}>
                        <FrozenOutlet />
                    </Suspense>
                </motion.div>
            </AnimatePresence>
            <Toaster />
        </TooltipProvider>
    );
}

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <App /> },
            { path: "/contact", element: <Contact /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
