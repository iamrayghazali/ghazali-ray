import {
    createBrowserRouter,
} from "react-router-dom";

import App from "@/App";

import NotFoundPage from "@/pages/404/404";
import Contact from "@/pages/contact/Contact";
import {TooltipProvider} from "@/components/ui/tooltip.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/contact",
        element: <TooltipProvider>
                    <Contact />
                 </TooltipProvider>,
    },
    {
        path: "*",
        element: <TooltipProvider>
                    <NotFoundPage />
                 </TooltipProvider>,
    },
]);