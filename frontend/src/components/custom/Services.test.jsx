import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => mockNavigate };
});

import Services from "./Services.jsx";

describe("Services", () => {
    beforeEach(() => {
        mockNavigate.mockReset();
    });

    it("renders the heading and every offering", () => {
        render(<Services />);
        expect(screen.getByText("What I can do for you")).toBeInTheDocument();
        expect(screen.getByText("Video editing")).toBeInTheDocument();
        expect(screen.getByText("SEO optimization")).toBeInTheDocument();
        expect(screen.getByText("Social media")).toBeInTheDocument();
        expect(screen.getByText("Branding")).toBeInTheDocument();
    });

    it("lists Full websites without a badge", () => {
        render(<Services />);
        expect(screen.getByText("Full websites")).toBeInTheDocument();
        expect(
            screen.getByText(/frontend, backend, hosting & domain/i)
        ).toBeInTheDocument();
        expect(screen.queryByText(/most popular/i)).not.toBeInTheDocument();
    });

    it("navigates to /contact when the contact button is clicked", async () => {
        const user = userEvent.setup();
        render(<Services />);
        await user.click(screen.getByRole("button", { name: /work together/i }));
        expect(mockNavigate).toHaveBeenCalledWith("/contact");
    });
});
