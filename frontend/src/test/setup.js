import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
});

if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    });
}

if (!window.IntersectionObserver) {
    class IO {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    }
    window.IntersectionObserver = IO;
    globalThis.IntersectionObserver = IO;
}

if (!window.ResizeObserver) {
    class RO {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    window.ResizeObserver = RO;
    globalThis.ResizeObserver = RO;
}
