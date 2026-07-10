import { test } from "node:test";
import assert from "node:assert/strict";

import {
    isValidEmail,
    isValidMessage,
    buildTemplateParams,
    MESSAGE_MIN,
    MESSAGE_MAX,
    EMAIL_MAX,
} from "../lib/validation.js";

test("isValidEmail accepts well-formed addresses", () => {
    assert.ok(isValidEmail("a@b.co"));
    assert.ok(isValidEmail("ghazali.raydan@gmail.com"));
    assert.ok(isValidEmail("first.last+tag@sub.domain.io"));
    assert.ok(isValidEmail("  trimmed@example.com  "));
});

test("isValidEmail rejects malformed addresses", () => {
    assert.equal(isValidEmail(""), false);
    assert.equal(isValidEmail("   "), false);
    assert.equal(isValidEmail("no-at-sign"), false);
    assert.equal(isValidEmail("no@domain"), false);
    assert.equal(isValidEmail("@nolocal.com"), false);
    assert.equal(isValidEmail("two@@at.com"), false);
    assert.equal(isValidEmail("spaces in@email.com"), false);
    assert.equal(isValidEmail("with\nnewline@email.com"), false);
});

test("isValidEmail rejects non-strings and over-long addresses", () => {
    assert.equal(isValidEmail(null), false);
    assert.equal(isValidEmail(undefined), false);
    assert.equal(isValidEmail(12345), false);
    assert.equal(isValidEmail({}), false);
    const tooLong = `${"a".repeat(EMAIL_MAX)}@example.com`;
    assert.equal(isValidEmail(tooLong), false);
});

test("isValidMessage enforces min/max length on trimmed content", () => {
    assert.equal(isValidMessage("a".repeat(MESSAGE_MIN - 1)), false);
    assert.ok(isValidMessage("a".repeat(MESSAGE_MIN)));
    assert.ok(isValidMessage("a".repeat(MESSAGE_MAX)));
    assert.equal(isValidMessage("a".repeat(MESSAGE_MAX + 1)), false);
    assert.equal(isValidMessage(`   ${"a".repeat(MESSAGE_MIN - 1)}   `), false);
    assert.equal(isValidMessage("        "), false);
});

test("isValidMessage rejects non-strings", () => {
    assert.equal(isValidMessage(null), false);
    assert.equal(isValidMessage(undefined), false);
    assert.equal(isValidMessage(42), false);
});

test("buildTemplateParams maps input to EmailJS template variables", () => {
    const params = buildTemplateParams({
        email: "visitor@example.com",
        message: "Hello there\nsecond line",
    });

    assert.equal(params.from_email, "visitor@example.com");
    assert.equal(params.reply_to, "visitor@example.com");
    assert.match(params.subject, /visitor@example\.com/);
    assert.equal(params.message, "Hello there\nsecond line");
});
