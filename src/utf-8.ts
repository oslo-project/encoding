import { DynamicBuffer } from "@oslojs/binary";

/** UTF-8 encodes a string into a byte sequence. Throws a `TypeError` on invalid code points:
 *
 * - Code points greater than 0x10ffff.
 * - High and low surrogates used by UTF-16.
 */
export function encodeUTF8(s: string): Uint8Array {
	const buffer = new DynamicBuffer(s.length);
	let i = 0;
	while (i < s.length) {
		const codePoint = s.codePointAt(i) ?? null;
		if (codePoint === null) {
			throw new Error("Unexpected state");
		}
		if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
			throw new TypeError("Invalid character");
		}
		if (codePoint <= 0x7f) {
			buffer.writeByte(codePoint);
			i++;
		} else if (codePoint <= 0x07ff) {
			buffer.writeByte(0b11000000 | (codePoint >> 6));
			buffer.writeByte(0b10000000 | (codePoint & 0x3f));
			i++;
		} else if (codePoint <= 0xffff) {
			buffer.writeByte(0b11100000 | (codePoint >> 12));
			buffer.writeByte(0b10000000 | ((codePoint >> 6) & 0x3f));
			buffer.writeByte(0b10000000 | (codePoint & 0x3f));
			i++;
		} else if (codePoint <= 0x10ffff) {
			buffer.writeByte(0b11110000 | (codePoint >> 18));
			buffer.writeByte(0b10000000 | ((codePoint >> 12) & 0x3f));
			buffer.writeByte(0b10000000 | ((codePoint >> 6) & 0x3f));
			buffer.writeByte(0b10000000 | (codePoint & 0x3f));
			i += 2;
		} else {
			throw new TypeError("Invalid character");
		}
	}
	return buffer.bytes();
}

/** UTF-8 decodes a byte sequence into a string. Throws a `TypeError` on invalid character encodings:
 *
 * - Overlong encodings.
 * - Code points greater than x10ffff.
 * - High and low surrogates used by UTF-16.
 * - Leading continuation byte.
 * - Non-continuation byte before the end of a character.
 *
 * The byte-order mark character is decoded into an empty string.
 */
export function decodeUTF8(bytes: Uint8Array): string {
	const codePoints = decodeUTF8IntoCodePoints(bytes);
	let s = "";
	for (let i = 0; i < codePoints.length; i++) {
		if (codePoints[i] !== 0xfeff) {
			s += String.fromCodePoint(codePoints[i]);
		}
	}
	return s;
}

/** UTF-8 decodes a byte sequence into an array of code points (uint16). Throws a `TypeError` on invalid encodings:
 *
 * - Overlong encodings.
 * - Code points greater than x10ffff.
 * - High and low surrogates used by UTF-16.
 * - Leading continuation byte.
 * - Non-continuation byte before the end of a character.
 */
export function decodeUTF8IntoCodePoints(bytes: Uint8Array): Uint32Array {
	const array = new Uint32Array(bytes.length);
	let sliceSize = 0;
	let i = 0;
	while (i < bytes.length) {
		let charPoint: number;
		if (bytes[i] >> 7 === 0b0) {
			// 1 byte

			charPoint = bytes[i] & 0x7f;
			i += 1;
		} else if (bytes[i] >> 5 === 0b110) {
			// 2 bytes

			if (i + 1 > bytes.length) {
				throw new TypeError("Invalid encoding");
			}
			// overlong
			if (bytes[i] === 0xc0 || bytes[i] === 0xc1) {
				throw new TypeError("Invalid encoding");
			}
			// non-continuation byte
			if (bytes[i + 1] >> 6 !== 0b10) {
				throw new TypeError("Invalid encoding");
			}
			charPoint = (bytes[i] & 0x1f) << 6;
			charPoint |= bytes[i + 1] & 0x3f;
			i += 2;
		} else if (bytes[i] >> 4 === 0b1110) {
			// 3 bytes

			if (i + 2 > bytes.length) {
				throw new TypeError("Invalid encoding");
			}
			// overlong
			if (bytes[i] === 0xe0 && bytes[i + 1] < 0xa0) {
				throw new TypeError("Invalid encoding");
			}
			// non-continuation byte
			if (bytes[i + 1] >> 6 !== 0b10 || bytes[i + 2] >> 6 !== 0b10) {
				throw new TypeError("Invalid encoding");
			}
			charPoint = (bytes[i] & 0x0f) << 12;
			charPoint |= (bytes[i + 1] & 0x3f) << 6;
			charPoint |= bytes[i + 2] & 0x3f;
			i += 3;
		} else if (bytes[i] >> 3 === 0b11110) {
			// 4 bytes

			if (i + 3 > bytes.length) {
				throw new TypeError("Invalid encoding");
			}
			if (bytes[i + 1] >> 6 !== 0b10) {
				throw new TypeError("Invalid encoding");
			}
			// overlong
			if (bytes[i] === 0xf0 && bytes[i + 1] < 0x90) {
				throw new TypeError("Invalid encoding");
			}
			// greater than 0x10ffff
			if (bytes[i] === 0xf4 && bytes[i + 1] >= 0x90) {
				throw new TypeError("Invalid encoding");
			}
			// non-continuation byte
			if (bytes[i + 1] >> 6 !== 0b10 || bytes[i + 2] >> 6 !== 0b10 || bytes[i + 2] >> 6 !== 0b10) {
				throw new TypeError("Invalid encoding");
			}
			charPoint = (bytes[i] & 0x07) << 18;
			charPoint |= (bytes[i + 1] & 0x3f) << 12;
			charPoint |= (bytes[i + 2] & 0x3f) << 6;
			charPoint |= bytes[i + 3] & 0x3f;
			i += 4;
		} else {
			throw new TypeError("Invalid encoding");
		}

		// utf-16 surrogate
		if (charPoint >= 0xd800 && charPoint <= 0xdfff) {
			throw new TypeError("Invalid encoding");
		}

		array[sliceSize] = charPoint;
		sliceSize++;
	}
	return array.subarray(0, sliceSize);
}

/** Reports whether the byte sequence is a valid UTF-8 encoding. Returns `false` on:
 *
 * - Overlong encodings.
 * - Code points greater than x10ffff.
 * - High and low surrogates used by UTF-16.
 * - Leading continuation byte.
 * - Non-continuation byte before the end of a character.
 */
export function isValidUTF8Encoding(bytes: Uint8Array): boolean {
	let i = 0;
	while (i < bytes.length) {
		let charPoint: number;
		if (bytes[i] >> 7 === 0b0) {
			// 1 byte

			charPoint = bytes[i] & 0x7f;
			i += 1;
		} else if (bytes[i] >> 5 === 0b110) {
			// 2 bytes

			if (i + 1 > bytes.length) {
				return false;
			}
			// overlong
			if (bytes[i] === 0xc0 || bytes[i] === 0xc1) {
				return false;
			}
			// non-continuation byte
			if (bytes[i + 1] >> 6 !== 0b10) {
				return false;
			}
			charPoint = (bytes[i] & 0x1f) << 6;
			charPoint |= bytes[i + 1] & 0x3f;
			i += 2;
		} else if (bytes[i] >> 4 === 0b1110) {
			// 3 bytes

			if (i + 2 > bytes.length) {
				return false;
			}
			// overlong
			if (bytes[i] === 0xe0 && bytes[i + 1] < 0xa0) {
				return false;
			}
			// non-continuation byte
			if (bytes[i + 1] >> 6 !== 0b10 || bytes[i + 2] >> 6 !== 0b10) {
				return false;
			}
			charPoint = (bytes[i] & 0x0f) << 12;
			charPoint |= (bytes[i + 1] & 0x3f) << 6;
			charPoint |= bytes[i + 2] & 0x3f;
			i += 3;
		} else if (bytes[i] >> 3 === 0b11110) {
			// 4 bytes

			if (i + 3 > bytes.length) {
				return false;
			}
			if (bytes[i + 1] >> 6 !== 0b10) {
				return false;
			}
			// overlong
			if (bytes[i] === 0xf0 && bytes[i + 1] < 0x90) {
				return false;
			}
			// greater than 0x10ffff
			if (bytes[i] === 0xf4 && bytes[i + 1] >= 0x90) {
				return false;
			}
			// non-continuation byte
			if (bytes[i + 1] >> 6 !== 0b10 || bytes[i + 2] >> 6 !== 0b10 || bytes[i + 2] >> 6 !== 0b10) {
				return false;
			}
			charPoint = (bytes[i] & 0x07) << 18;
			charPoint |= (bytes[i + 1] & 0x3f) << 12;
			charPoint |= (bytes[i + 2] & 0x3f) << 6;
			charPoint |= bytes[i + 3] & 0x3f;
			i += 4;
		} else {
			return false;
		}

		// utf-16 surrogate
		if (charPoint >= 0xd800 && charPoint <= 0xdfff) {
			return false;
		}
	}
	return true;
}
