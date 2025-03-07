import * as vitest from "vitest";

import { decodeASCII, encodeASCII, isValidASCIIEncoding } from "./ascii.js";

vitest.describe("encodeASCII()", () => {
	vitest.test("valid code points", () => {
		for (let i = 0; i <= 0x7f; i++) {
			const s = String.fromCodePoint(i);
			const result = encodeASCII(s);
			const expected = new TextEncoder().encode(s);
			vitest.expect(result, `test code point ${i}`).toEqual(expected);
		}
	});

	vitest.test("multiple valid code points", () => {
		for (let i = 0; i <= 0x7f; i++) {
			for (let j = 0; j <= 0x7f; j++) {
				const s = String.fromCodePoint(i, j);
				const result = encodeASCII(s);
				const expected = new TextEncoder().encode(s);
				vitest.expect(result, `test code points ${i}, ${j}`).toEqual(expected);
			}
		}
	});

	vitest.test(" invalid ascii", () => {
		const s = String.fromCodePoint(0x8f);
		vitest.expect(() => encodeASCII(s)).toThrow(TypeError);
	});
});

vitest.describe("decodeASCII()", () => {
	vitest.test("valid code point", () => {
		for (let i = 0; i <= 0x7f; i++) {
			const s = String.fromCodePoint(i);
			const encoded = encodeASCII(s);
			const result = decodeASCII(encoded);
			vitest.expect(result, `test code point ${i}`).toBe(s);
		}
	});

	vitest.test("multiple valid code points", () => {
		for (let i = 0; i <= 0x7f; i++) {
			for (let j = 0; j <= 0x7f; j++) {
				const s = String.fromCodePoint(i, j);
				const encoded = encodeASCII(s);
				const result = decodeASCII(encoded);
				vitest.expect(result, `test code points ${i}, ${j}`).toBe(s);
			}
		}
	});

	vitest.test(" invalid code point", () => {
		const bytes = new Uint8Array([0x80]);
		vitest.expect(() => decodeASCII(bytes)).toThrow(TypeError);
	});
});

vitest.describe("isValidASCIIEncoding()", () => {
	vitest.test("valid", () => {
		for (let i = 0; i <= 0x7f; i++) {
			for (let j = 0; j <= 0x7f; j++) {
				const encoded = new Uint8Array([i, j]);
				const result = isValidASCIIEncoding(encoded);
				vitest.expect(result, `test code points ${i}, ${j}`).toBe(true);
			}
		}
	});

	vitest.test("invalid code point", () => {
		const bytes = new Uint8Array([0x80]);
		const result = isValidASCIIEncoding(bytes);
		vitest.expect(result).toBe(false);
	});
});
