import {
    createBrowserRouter,
} from "react-router-dom";

import App from "@/App";

import NotFoundPage from "@/pages/404/404";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);