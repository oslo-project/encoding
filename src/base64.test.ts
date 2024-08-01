import { expect, test } from "vitest";
import {
	decodeBase64,
	decodeBase64IgnorePadding,
	encodeBase64,
	encodeBase64NoPadding
} from "./base64.js";

test("encodeBase64()", () => {
	expect(encodeBase64(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase64(bytes)).toBe(Buffer.from(bytes).toString("base64"));
	}
});

test("encodeBase64NoPadding()", () => {
	expect(encodeBase64(new Uint8Array())).toBe("");
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(encodeBase64NoPadding(bytes)).toBe(encodeBase64(bytes).replaceAll("=", ""));
	}
});

test("decodeBase64()", () => {
	expect(decodeBase64("")).toStrictEqual(new Uint8Array());
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(decodeBase64(encodeBase64(bytes))).toStrictEqual(bytes);
	}
});

test("decodeBase64IgnorePadding()", () => {
	expect(decodeBase64IgnorePadding("")).toStrictEqual(new Uint8Array());
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(decodeBase64IgnorePadding(encodeBase64NoPadding(bytes))).toStrictEqual(bytes);
	}
	// includes padding but invalid padding count
	for (let i = 1; i <= 100; i++) {
		const bytes = new Uint8Array(i);
		crypto.getRandomValues(bytes);
		expect(decodeBase64IgnorePadding(encodeBase64(bytes).replace("=", ""))).toStrictEqual(bytes);
	}
});

test("decodeBase64() throws on invalid padding", () => {
	expect(() => decodeBase64("qqo")).toThrowError();
	expect(() => decodeBase64("qqp=")).toThrowError();
	expect(() => decodeBase64("q===")).toThrowError();
	expect(() => decodeBase64("====")).toThrowError();
	expect(() => decodeBase64("=")).toThrowError();
	expect(() => decodeBase64("q=q=")).toThrowError();
	expect(() => decodeBase64("qqqqq===")).toThrowError();
	expect(() => decodeBase64("qqqq====")).toThrowError();
	expect(() => decodeBase64("qqqqq=qq")).toThrowError();
});
