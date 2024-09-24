import { expect, test } from "vitest";
import { base32 as base32Reference } from "@scure/base";
import {
	decodeBase32,
	decodeBase32IgnorePadding,
	encodeBase32,
	encodeBase32LowerCase,
	encodeBase32LowerCaseNoPadding,
	encodeBase32NoPadding,
	encodeBase32UpperCase,
	encodeBase32UpperCaseNoPadding
} from "./base32.js";

test("encodeBase32()", () => {
	expect(encodeBase32(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase32(bytes)).toBe(base32Reference.encode(bytes));
	}
});

test("encodeBase32NoPadding()", () => {
	expect(encodeBase32(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase32NoPadding(bytes)).toBe(base32Reference.encode(bytes).replaceAll("=", ""));
	}
});

test("encodeBase32UpperCase()", () => {
	expect(encodeBase32(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase32UpperCase(bytes)).toBe(base32Reference.encode(bytes));
	}
});

test("encodeBase32UpperCaseNoPadding()", () => {
	expect(encodeBase32(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase32UpperCaseNoPadding(bytes)).toBe(
			base32Reference.encode(bytes).replaceAll("=", "")
		);
	}
});

test("encodeBase32LowerCase()", () => {
	expect(encodeBase32(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase32LowerCase(bytes)).toBe(base32Reference.encode(bytes).toLowerCase());
	}
});

test("encodeBase32LowerCaseNoPadding()", () => {
	expect(encodeBase32(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase32LowerCaseNoPadding(bytes)).toBe(
			base32Reference.encode(bytes).toLowerCase().replaceAll("=", "")
		);
	}
});

test("decodeBase32()", () => {
	expect(decodeBase32("")).toStrictEqual(new Uint8Array());
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(decodeBase32(encodeBase32(bytes))).toStrictEqual(bytes);
	}
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(decodeBase32(encodeBase32(bytes).toLowerCase())).toStrictEqual(bytes);
	}
});

test("decodeBase32IgnorePadding()", () => {
	expect(decodeBase32IgnorePadding("")).toStrictEqual(new Uint8Array());
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(decodeBase32IgnorePadding(encodeBase32NoPadding(bytes))).toStrictEqual(bytes);
	}
	// includes padding but invalid padding count
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(decodeBase32IgnorePadding(encodeBase32(bytes).replace("=", ""))).toStrictEqual(bytes);
	}
});

test("decodeBase32() throws on invalid padding", () => {
	expect(() => decodeBase32("VKVA")).toThrowError();
	expect(() => decodeBase32("VKVK====")).toThrowError();
	expect(() => decodeBase32("V=======")).toThrowError();
	expect(() => decodeBase32("========")).toThrowError();
	expect(() => decodeBase32("=")).toThrowError();
	expect(() => decodeBase32("V=VKVKVK")).toThrowError();
	expect(() => decodeBase32("VKVKVKVK========")).toThrowError();
	expect(() => decodeBase32("VKVKVKVKV=VKVKVK")).toThrowError();
	expect(() => decodeBase32("VKVKVKVKV=======")).toThrowError();
});
