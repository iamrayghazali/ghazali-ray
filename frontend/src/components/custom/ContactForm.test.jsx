import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import ContactForm from "./ContactForm.jsx";

const API = "http://api.test";

function renderForm() {
    return render(
        <MemoryRouter>
            <ContactForm />
        </MemoryRouter>
    );
}

function mockFetch(impl) {
    const fn = vi.fn(impl);
    vi.stubGlobal("fetch", fn);
    return fn;
}

const okResponse = () => ({
    ok: true,
    json: async () => ({ message: "Email sent successfully.", code: "SUCCESS" }),
});
const errResponse = (code, error) => ({
    ok: false,
    json: async () => ({ code, error }),
});

describe("ContactForm", () => {
    beforeEach(() => {
        vi.stubEnv("VITE_API_URL", API);
    });

    it("renders the email and message fields", () => {
        renderForm();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /send/i })).toBeDisabled();
    });

    it("shows a validation error when the email is invalid on blur", async () => {
        const user = userEvent.setup();
        renderForm();
        const email = screen.getByLabelText(/email/i);
        await user.type(email, "not-an-email");
        fireEvent.blur(email);
        expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    });

    it("shows an error when the message is too short on blur", async () => {
        const user = userEvent.setup();
        renderForm();
        const message = screen.getByLabelText(/message/i);
        await user.type(message, "short");
        fireEvent.blur(message);
        expect(await screen.findByText(/at least 10 characters/i)).toBeInTheDocument();
    });

    it("updates the character counter", async () => {
        const user = userEvent.setup();
        renderForm();
        await user.type(screen.getByLabelText(/message/i), "hello");
        expect(screen.getByText("5 / 2000")).toBeInTheDocument();
    });

    it("enables Send only when email and message are valid", async () => {
        const user = userEvent.setup();
        renderForm();
        const button = screen.getByRole("button", { name: /send/i });
        expect(button).toBeDisabled();

        await user.type(screen.getByLabelText(/email/i), "visitor@example.com");
        await user.type(screen.getByLabelText(/message/i), "This is long enough.");
        expect(button).toBeEnabled();
    });

    it("submits to the API and shows the success state", async () => {
        const user = userEvent.setup();
        const fetchMock = mockFetch(async () => okResponse());
        renderForm();

        await user.type(screen.getByLabelText(/email/i), "visitor@example.com");
        await user.type(screen.getByLabelText(/message/i), "This is a long enough message.");
        await user.click(screen.getByRole("button", { name: /send/i }));

        await waitFor(() => expect(screen.getByText(/message sent/i)).toBeInTheDocument());

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, options] = fetchMock.mock.calls[0];
        expect(url).toBe(`${API}/contact`);
        expect(options.method).toBe("POST");
        expect(JSON.parse(options.body)).toEqual({
            email: "visitor@example.com",
            message: "This is a long enough message.",
        });
    });

    it("maps a known server error code to a friendly message", async () => {
        const user = userEvent.setup();
        mockFetch(async () => errResponse("RATE_LIMITED"));
        renderForm();

        await user.type(screen.getByLabelText(/email/i), "visitor@example.com");
        await user.type(screen.getByLabelText(/message/i), "This is a long enough message.");
        await user.click(screen.getByRole("button", { name: /send/i }));

        expect(await screen.findByText(/too many attempts/i)).toBeInTheDocument();
    });

    it("shows the raw server message for a cooldown response", async () => {
        const user = userEvent.setup();
        mockFetch(async () => errResponse("COOLDOWN_ACTIVE", "Please try again in 1h 30m."));
        renderForm();

        await user.type(screen.getByLabelText(/email/i), "visitor@example.com");
        await user.type(screen.getByLabelText(/message/i), "This is a long enough message.");
        await user.click(screen.getByRole("button", { name: /send/i }));

        expect(await screen.findByText(/try again in 1h 30m/i)).toBeInTheDocument();
    });

    it("shows a connection error when fetch rejects", async () => {
        const user = userEvent.setup();
        mockFetch(async () => {
            throw new Error("network down");
        });
        renderForm();

        await user.type(screen.getByLabelText(/email/i), "visitor@example.com");
        await user.type(screen.getByLabelText(/message/i), "This is a long enough message.");
        await user.click(screen.getByRole("button", { name: /send/i }));

        expect(await screen.findByText(/could not reach the server/i)).toBeInTheDocument();
    });

    it("blocks submission and shows an error when the email is invalid on click", async () => {
        const user = userEvent.setup();
        const fetchMock = mockFetch(async () => okResponse());
        renderForm();

        await user.type(screen.getByLabelText(/email/i), "bad");
        await user.type(screen.getByLabelText(/message/i), "This is a long enough message.");
        await user.click(screen.getByRole("button", { name: /send/i }));

        expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
        expect(fetchMock).not.toHaveBeenCalled();
    });
});
