import {
    createBrowserRouter,
} from "react-router-dom";

import App from "@/App";

import NotFoundPage from "@/pages/404/404";
import Contact from "@/pages/contact/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);