import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

    // Ensure the automatic JSX runtime is used everywhere (incl. under Vitest),
    // so component/test files don't need to import React themselves.
    esbuild: {
        jsx: "automatic",
    },

    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.js",
        css: false,
    },
});