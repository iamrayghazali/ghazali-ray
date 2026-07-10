import { describe, it, expect } from "vitest";
import { validateEmail } from "./validateEmail";

describe("validateEmail", () => {
    it("returns 'required' for empty / whitespace input", () => {
        expect(validateEmail("")).toBe("Email is required.");
        expect(validateEmail("   ")).toBe("Email is required.");
        expect(validateEmail(null)).toBe("Email is required.");
        expect(validateEmail(undefined)).toBe("Email is required.");
    });

    it("returns an error message for malformed addresses", () => {
        expect(validateEmail("no-at-sign")).toBe("Enter a valid email address.");
        expect(validateEmail("missing@domain")).toBe("Enter a valid email address.");
        expect(validateEmail("@nolocal.com")).toBe("Enter a valid email address.");
        expect(validateEmail("spaces in@email.com")).toBe("Enter a valid email address.");
    });

    it("returns null for valid addresses", () => {
        expect(validateEmail("a@b.co")).toBeNull();
        expect(validateEmail("ghazali.raydan@gmail.com")).toBeNull();
        expect(validateEmail("first.last+tag@sub.domain.io")).toBeNull();
    });

    it("trims before validating", () => {
        expect(validateEmail("  valid@example.com  ")).toBeNull();
    });
});
