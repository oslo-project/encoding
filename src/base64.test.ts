import { describe, expect, test } from "vitest";
import { base64 } from "./base64.js";

describe("Base64Encoding", () => {
	test("Base64Encoding.encode()", () => {
		const cases = [0, 1, 2, 3, 4, 5, 6];
		for (const length of cases) {
			const data = crypto.getRandomValues(new Uint8Array(length));
			expect(base64.encode(data)).toBe(Buffer.from(data).toString("base64"));
		}
	});

	test("Base64Encoding.encodeNoPadding()", () => {
		const cases = [0, 1, 2, 3, 4, 5, 6];
		for (const length of cases) {
			const data = crypto.getRandomValues(new Uint8Array(length));
			expect(base64.encodeNoPadding(data)).toBe(
				Buffer.from(data).toString("base64").replaceAll("=", "")
			);
		}
	});

	describe("Base64Encoding.decodeIgnorePadding()", () => {
		test("Returns encoded data", () => {
			const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			for (const length of cases) {
				const data = crypto.getRandomValues(new Uint8Array(length));
				const encoded = base64.encode(data);
				expect(base64.decodeIgnorePadding(encoded)).toStrictEqual(data);
			}
		});

		test("Accepts encoded data with missing padding", () => {
			const data = crypto.getRandomValues(new Uint8Array(4));
			const encoded = base64.encodeNoPadding(data);
			const result = base64.decodeIgnorePadding(encoded);
			expect(result).toStrictEqual(data);
		});

		test("Throws if padding character is misplaced", () => {
			const encoded = "Pd2SHA=A";
			expect(() => base64.decode(encoded)).toThrow();
		});
	});

	describe("Base64Encoding.decodeStrictPadding()", () => {
		test("Returns encoded data", () => {
			const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			for (const length of cases) {
				const data = crypto.getRandomValues(new Uint8Array(length));
				const encoded = base64.encode(data);
				expect(base64.decode(encoded)).toStrictEqual(data);
			}
		});

		test("Throws if data is missing padding", () => {
			const data = crypto.getRandomValues(new Uint8Array(4));
			const encoded = base64.encodeNoPadding(data);
			expect(() => base64.decode(encoded)).toThrow();
		});

		test("Throws if padding character is misplaced", () => {
			const encoded = "Pd2SHA=A";
			expect(() => base64.decode(encoded)).toThrow();
		});
	});
});
