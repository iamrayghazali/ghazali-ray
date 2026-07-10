import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/custom/Navbar.jsx", () => ({ default: () => null }));
vi.mock("@/components/custom/ContactForm.jsx", () => ({ default: () => null }));
vi.mock("@/components/ui/dia-text-reveal.jsx", () => ({ DiaTextReveal: () => null }));

const toastSuccess = vi.fn();
const toastError = vi.fn();
vi.mock("sonner", () => ({
    toast: {
        success: (...args) => toastSuccess(...args),
        error: (...args) => toastError(...args),
    },
}));

import Contact from "./Contact.jsx";

function spyClipboard() {
    if (!navigator.clipboard) {
        Object.defineProperty(navigator, "clipboard", {
            value: { writeText: () => Promise.resolve() },
            configurable: true,
        });
    }
    return vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
}

describe("Contact page — copy email", () => {
    beforeEach(() => {
        toastSuccess.mockReset();
        toastError.mockReset();
    });

    it("copies the email address and shows a 'Copied!' toast", async () => {
        const user = userEvent.setup();
        const writeText = spyClipboard();
        render(<Contact />);

        await user.click(screen.getByRole("button", { name: /copy email address/i }));

        expect(writeText).toHaveBeenCalledWith("ghazali.raydan@gmail.com");
        await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Copied!", expect.anything()));
        expect(toastError).not.toHaveBeenCalled();
    });

    it("shows an error toast if the clipboard write fails", async () => {
        const user = userEvent.setup();
        const writeText = spyClipboard();
        writeText.mockRejectedValueOnce(new Error("denied"));
        render(<Contact />);

        await user.click(screen.getByRole("button", { name: /copy email address/i }));

        await waitFor(() => expect(toastError).toHaveBeenCalled());
        expect(toastSuccess).not.toHaveBeenCalled();
    });
});
