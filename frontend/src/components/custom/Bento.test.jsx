import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Bento from "./Bento.jsx";

describe("Bento", () => {
    it("renders the heading and all five card titles", () => {
        render(<Bento />);
        expect(screen.getByText("Quick access")).toBeInTheDocument();
        for (const name of ["Contact", "Projects", "Design", "Front End", "Back End"]) {
            expect(screen.getByRole("heading", { name })).toBeInTheDocument();
        }
    });

    it("opens external card links in a new tab with a safe rel", () => {
        render(<Bento />);
        const external = screen.getAllByRole("link", { name: /see my projects/i });
        expect(external.length).toBeGreaterThan(0);
        for (const link of external) {
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
        }
    });
});
