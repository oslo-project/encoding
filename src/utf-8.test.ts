import * as vitest from "vitest";

import { decodeUTF8, decodeUTF8IntoCodePoints, encodeUTF8, isValidUTF8Encoding } from "./utf-8.js";

vitest.describe("encodeUTF8()", () => {
	vitest.test("valid code points", () => {
		for (let i = 0; i <= 0x10ffff; i++) {
			const s = String.fromCodePoint(i);
			// invalid character points
			if (i >= 0xd800 && i <= 0xdfff) {
				continue;
			}
			const result = encodeUTF8(s);
			const expected = new TextEncoder().encode(s);
			vitest.expect(result, `test code point ${i}`).toEqual(expected);
		}
	});

	vitest.test("multiple code points", () => {
		const points = [0x0000, 0x007f, 0x0080, 0x07ff, 0x0800, 0xffff, 0x010000, 0x10ffff];
		for (let i = 0; i < points.length; i++) {
			for (let j = 0; j < points.length; j++) {
				const s = String.fromCodePoint(points[i], points[j]);
				const result = encodeUTF8(s);
				const expected = new TextEncoder().encode(s);
				vitest.expect(result, `test code points ${points[i]}, ${points[j]}`).toEqual(expected);
			}
		}
	});

	vitest.test(" utf-16 surrogate", () => {
		const cases = [0xd800, 0xdfff];
		for (let i = 0; i < cases.length; i++) {
			const s = String.fromCodePoint(cases[i]);
			vitest.expect(() => encodeUTF8(s), `test code point ${cases[i]}`).toThrow(TypeError);
		}
	});

	vitest.test(" multiple code points with surrogate", () => {
		const points = [0x0000, 0x007f, 0x0080, 0x07ff, 0x0800, 0xffff, 0x010000, 0x10ffff];
		const surrogates = [0xd800, 0xdfff];
		for (let i = 0; i < points.length; i++) {
			for (let j = 0; j < surrogates.length; j++) {
				const s = String.fromCodePoint(points[i], surrogates[j]);
				vitest
					.expect(() => encodeUTF8(s), `test code point ${points[i]}, ${surrogates[j]}`)
					.toThrow(TypeError);
			}
		}
		for (let i = 0; i < surrogates.length; i++) {
			for (let j = 0; j < points.length; j++) {
				const s = String.fromCodePoint(surrogates[i], points[j]);
				vitest
					.expect(() => encodeUTF8(s), `test code points ${surrogates[i]}, ${points[j]}`)
					.toThrow(TypeError);
			}
		}
	});
});

vitest.describe("decodeUTF8()", () => {
	vitest.test("valid code point", () => {
		for (let i = 0; i <= 0x10ffff; i++) {
			// invalid character points
			if (i >= 0xd800 && i <= 0xdfff) {
				continue;
			}
			const s = String.fromCodePoint(i);
			const encoded = encodeUTF8(s);
			const result = decodeUTF8(encoded);
			const expected = new TextDecoder().decode(encoded);
			vitest.expect(result, `test code point ${i}`).toEqual(expected);
		}
	});

	vitest.test("multiple valid code points", () => {
		const points = [0x0000, 0x007f, 0x0080, 0x07ff, 0x0800, 0xffff, 0x010000, 0x10ffff];
		for (let i = 0; i < points.length; i++) {
			for (let j = 0; j < points.length; j++) {
				const s = String.fromCodePoint(points[i], points[j]);
				const encoded = encodeUTF8(s);
				const result = decodeUTF8(encoded);
				const expected = new TextDecoder().decode(encoded);
				vitest.expect(result, `test code points ${points[i]}, ${points[j]}`).toEqual(expected);
			}
		}
	});

	vitest.test("ignore BOM", () => {
		const bytes = new Uint8Array([0xef, 0xbb, 0xbf]);
		const result = decodeUTF8(bytes);
		vitest.expect(result).toBe("");
	});

	vitest.test(" overlong encoding", () => {
		const cases = [
			new Uint8Array([0xc0, 0x80]),
			new Uint8Array([0xc1, 0x80]),
			new Uint8Array([0xe0, 0x0f, 0x80]),
			new Uint8Array([0xf0, 0x8f, 0x80, 0x80])
		];
		for (let i = 0; i < cases.length; i++) {
			vitest.expect(() => decodeUTF8(cases[i])).toThrow(TypeError);
		}
	});

	vitest.test(" code points greater than 0x10ffff", () => {
		let bytes = new Uint8Array([0xf4, 0x8f, 0xbf, 0xbf]);
		vitest.expect(() => decodeUTF8(bytes)).not.toThrowError();
		bytes = new Uint8Array([0xf4, 0x90, 0x80, 0x80]);
		vitest.expect(() => decodeUTF8(bytes)).toThrow(TypeError);
	});

	vitest.test(" continuation byte at the start", () => {
		const bytes = new Uint8Array([0x80]);
		vitest.expect(() => decodeUTF8(bytes)).toThrow(TypeError);
	});

	vitest.test(" missing continuation byte", () => {
		const bytes = new Uint8Array([0xc0, 0x00]);
		vitest.expect(() => decodeUTF8(bytes)).toThrow(TypeError);
	});

	vitest.test(" invalid leading byte", () => {
		const cases = [
			new Uint8Array([0xff]),
			new Uint8Array([0xc1]),
			new Uint8Array([0xe0, 0x80]),
			new Uint8Array([0xf0, 0x80, 0x80])
		];
		for (let i = 0; i < cases.length; i++) {
			vitest.expect(() => decodeUTF8(cases[i])).toThrow(TypeError);
		}
	});
});

vitest.describe("decodeUTF8IntoCodePoints()", () => {
	vitest.test("valid code point", () => {
		for (let i = 0; i <= 0x10ffff; i++) {
			// invalid character points
			if (i >= 0xd800 && i <= 0xdfff) {
				continue;
			}
			const s = String.fromCodePoint(i);
			const encoded = encodeUTF8(s);
			const result = decodeUTF8IntoCodePoints(encoded);
			const expectedNums: number[] = [];
			let j = 0;
			while (j < s.length) {
				const codePoint = s.codePointAt(j) ?? null;
				if (codePoint === null) {
					throw new Error();
				}
				expectedNums.push(codePoint);
				if (codePoint > 0xffff) {
					j += 2;
				} else {
					j++;
				}
			}
			const expected = new Uint32Array(expectedNums);
			vitest.expect(result, `test code point ${i}`).toEqual(expected);
		}
	});

	vitest.test("multiple valid code points", () => {
		const points = [0x0000, 0x007f, 0x0080, 0x07ff, 0x0800, 0xffff, 0x010000, 0x10ffff];
		for (let i = 0; i < points.length; i++) {
			for (let j = 0; j < points.length; j++) {
				const s = String.fromCodePoint(points[i], points[j]);
				const encoded = encodeUTF8(s);
				const result = decodeUTF8IntoCodePoints(encoded);
				const expectedNums: number[] = [];
				let k = 0;
				while (k < s.length) {
					const codePoint = s.codePointAt(k) ?? null;
					if (codePoint === null) {
						throw new Error();
					}
					expectedNums.push(codePoint);
					if (codePoint > 0xffff) {
						k += 2;
					} else {
						k++;
					}
				}
				const expected = new Uint32Array(expectedNums);
				vitest.expect(result, `test code points ${points[i]}, ${points[j]}`).toEqual(expected);
			}
		}
	});

	vitest.test("BOM", () => {
		const bytes = new Uint8Array([0xef, 0xbb, 0xbf]);
		const result = decodeUTF8IntoCodePoints(bytes);
		const expected = new Uint32Array([0xfeff]);
		vitest.expect(result).toEqual(expected);
	});

	vitest.test(" overlong encoding", () => {
		const cases = [
			new Uint8Array([0xc0, 0x80]),
			new Uint8Array([0xc1, 0x80]),
			new Uint8Array([0xe0, 0x0f, 0x80]),
			new Uint8Array([0xf0, 0x8f, 0x80, 0x80])
		];
		for (let i = 0; i < cases.length; i++) {
			vitest.expect(() => decodeUTF8IntoCodePoints(cases[i])).toThrow(TypeError);
		}
	});

	vitest.test(" code points greater than 0x10ffff", () => {
		let bytes = new Uint8Array([0xf4, 0x8f, 0xbf, 0xbf]);
		vitest.expect(() => decodeUTF8IntoCodePoints(bytes)).not.toThrowError();
		bytes = new Uint8Array([0xf4, 0x90, 0x80, 0x80]);
		vitest.expect(() => decodeUTF8IntoCodePoints(bytes)).toThrow(TypeError);
	});

	vitest.test(" continuation byte at the start", () => {
		const bytes = new Uint8Array([0x80]);
		vitest.expect(() => decodeUTF8IntoCodePoints(bytes)).toThrow(TypeError);
	});

	vitest.test(" missing continuation byte", () => {
		const bytes = new Uint8Array([0xc0, 0x00]);
		vitest.expect(() => decodeUTF8IntoCodePoints(bytes)).toThrow(TypeError);
	});

	vitest.test(" invalid leading byte", () => {
		const cases = [
			new Uint8Array([0xff]),
			new Uint8Array([0xc1]),
			new Uint8Array([0xe0, 0x80]),
			new Uint8Array([0xf0, 0x80, 0x80])
		];
		for (let i = 0; i < cases.length; i++) {
			vitest.expect(() => decodeUTF8IntoCodePoints(cases[i])).toThrow(TypeError);
		}
	});
});

vitest.describe("isValidUTF8Encoding()", () => {
	vitest.test("multiple valid codes points", () => {
		const points = [0x0000, 0x007f, 0x0080, 0x07ff, 0x0800, 0xffff, 0x010000, 0x10ffff];
		for (let i = 0; i < points.length; i++) {
			for (let j = 0; j < points.length; j++) {
				const s = String.fromCodePoint(points[i], points[j]);
				const encoded = encodeUTF8(s);
				const result = isValidUTF8Encoding(encoded);
				vitest.expect(result, `test code points ${points[i]}, ${points[j]}`).toBe(true);
			}
		}
	});

	vitest.test("overlong encoding", () => {
		const cases = [
			new Uint8Array([0xc0, 0x80]),
			new Uint8Array([0xc1, 0x80]),
			new Uint8Array([0xe0, 0x0f, 0x80]),
			new Uint8Array([0xf0, 0x8f, 0x80, 0x80])
		];
		for (let i = 0; i < cases.length; i++) {
			const result = isValidUTF8Encoding(cases[i]);
			vitest.expect(result).toBe(false);
		}
	});

	vitest.test("code points greater than 0x10ffff", () => {
		let bytes = new Uint8Array([0xf4, 0x8f, 0xbf, 0xbf]);
		let result = isValidUTF8Encoding(bytes);
		vitest.expect(result).toBe(true);
		bytes = new Uint8Array([0xf4, 0x90, 0x80, 0x80]);
		result = isValidUTF8Encoding(bytes);
		vitest.expect(result).toBe(false);
	});

	vitest.test("continuation byte at the start", () => {
		const bytes = new Uint8Array([0x80]);
		const result = isValidUTF8Encoding(bytes);
		vitest.expect(result).toBe(false);
	});

	vitest.test("missing continuation byte", () => {
		const bytes = new Uint8Array([0xc0, 0x00]);
		const result = isValidUTF8Encoding(bytes);
		vitest.expect(result).toBe(false);
	});

	vitest.test("invalid leading byte", () => {
		const cases = [
			new Uint8Array([0xff]),
			new Uint8Array([0xc1]),
			new Uint8Array([0xe0, 0x80]),
			new Uint8Array([0xf0, 0x80, 0x80])
		];
		for (let i = 0; i < cases.length; i++) {
			const result = isValidUTF8Encoding(cases[i]);
			vitest.expect(result).toBe(false);
		}
	});
});
