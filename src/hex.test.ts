import { describe, expect, test } from "vitest";
import { encodeHexLowerCase, encodeHexUpperCase, decodeHex } from "./hex.js";

test("encodeHexLowerCase()", () => {
	const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	for (const length of cases) {
		const data = crypto.getRandomValues(new Uint8Array(length));
		expect(encodeHexLowerCase(data)).toBe(Buffer.from(data).toString("hex"));
	}
});

test("encodeHexUpperCase()", () => {
	const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	for (const length of cases) {
		const data = crypto.getRandomValues(new Uint8Array(length));
		expect(encodeHexUpperCase(data)).toBe(Buffer.from(data).toString("hex").toUpperCase());
	}
});

describe("Base32.decodeIgnorePadding()", () => {
	test("Returns encoded data", () => {
		for (let i = 0; i < 100; i++) {
			const data = crypto.getRandomValues(new Uint8Array(i));
			expect(decodeHex(encodeHexLowerCase(data))).toStrictEqual(data);
			expect(decodeHex(encodeHexUpperCase(data))).toStrictEqual(data);
		}
	});
	test("Throws Error if data is invalid", () => {
		expect(() => decodeHex("a")).toThrowError();
		expect(() => decodeHex("x")).toThrowError();
	});
});
