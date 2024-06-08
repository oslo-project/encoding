import { describe, expect, test } from "vitest";
import { base32 as base32Reference } from "@scure/base";
import { base32 } from "./base32.js";

describe("Base32Encoding", () => {
	test("Base32Encoding.encode()", () => {
		const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		for (const length of cases) {
			const data = crypto.getRandomValues(new Uint8Array(length));
			expect(base32.encode(data)).toBe(base32Reference.encode(data));
		}
	});

	test("Base32Encoding.encodeNoPadding()", () => {
		const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		for (const length of cases) {
			const data = crypto.getRandomValues(new Uint8Array(length));
			expect(base32.encodeNoPadding(data)).toBe(base32Reference.encode(data).replaceAll("=", ""));
		}
	});

	describe("Base32Encoding.decodeIgnorePadding()", () => {
		test("Returns encoded data", () => {
			const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			for (const length of cases) {
				const data = crypto.getRandomValues(new Uint8Array(length));
				const encoded = base32.encode(data);
				expect(base32.decodeIgnorePadding(encoded)).toStrictEqual(data);
			}
		});
		test("Accepts encoded data with missing padding", () => {
			const data = crypto.getRandomValues(new Uint8Array(4));
			const encoded = base32.encodeNoPadding(data);
			const result = base32.decodeIgnorePadding(encoded);
			expect(result).toStrictEqual(data);
		});
		test("Throws if padding character is misplaced", () => {
			const encoded = "J77W5WXN4A==A===";
			expect(() => base32.decode(encoded)).toThrow();
		});
	});

	describe("Base32Encoding.decodeStrictPadding()", () => {
		test("Returns encoded data", () => {
			const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			for (const length of cases) {
				const data = crypto.getRandomValues(new Uint8Array(length));
				const encoded = base32.encode(data);
				expect(base32.decode(encoded)).toStrictEqual(data);
			}
		});
		test("Throws if data is missing padding", () => {
			const data = crypto.getRandomValues(new Uint8Array(4));
			const encoded = base32.encodeNoPadding(data);
			expect(() => base32.decode(encoded)).toThrow();
		});
		test("Throws if padding character is misplaced", () => {
			const encoded = "J77W5WXN4A==A===";
			expect(() => base32.decode(encoded)).toThrow();
		});
	});
});
