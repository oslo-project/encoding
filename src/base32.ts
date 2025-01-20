export function encodeBase32UpperCase(bytes: Uint8Array): string {
	return encodeBase32_internal(bytes, base32UpperCaseAlphabet, EncodingPadding.Include);
}

export function encodeBase32UpperCaseNoPadding(bytes: Uint8Array): string {
	return encodeBase32_internal(bytes, base32UpperCaseAlphabet, EncodingPadding.None);
}

export function encodeBase32LowerCase(bytes: Uint8Array): string {
	return encodeBase32_internal(bytes, base32LowerCaseAlphabet, EncodingPadding.Include);
}

export function encodeBase32LowerCaseNoPadding(bytes: Uint8Array): string {
	return encodeBase32_internal(bytes, base32LowerCaseAlphabet, EncodingPadding.None);
}

/** Replaced: Use encodeBase32UpperCase() instead. */
export function encodeBase32(bytes: Uint8Array): string {
	return encodeBase32UpperCase(bytes);
}

/** Replaced: Use encodeBase32UpperCaseNoPadding() instead. */
export function encodeBase32NoPadding(bytes: Uint8Array): string {
	return encodeBase32UpperCaseNoPadding(bytes);
}

function encodeBase32_internal(
	bytes: Uint8Array,
	alphabet: string,
	padding: EncodingPadding
): string {
	let result = "";
	let buffer = 0;
	let bufferSize = 0;
	for (let i = 0; i < bytes.byteLength; i += 5) {
		let writtenCharsInChunk = 0;
		for (let j = 0; j < 5; j++) {
			if (i + j >= bytes.byteLength) {
				result += alphabet[buffer << (5 - bufferSize)]; // Append bits
				writtenCharsInChunk++;
				break;
			}
			buffer = (buffer << 8) | bytes[i + j];
			bufferSize += 8;
			while (bufferSize >= 5) {
				result += alphabet[buffer >> (bufferSize - 5)];
				buffer &= (1 << (bufferSize - 5)) - 1; // Remove leading 5 bits
				bufferSize -= 5;
				writtenCharsInChunk++;
			}
		}
		if (padding === EncodingPadding.Include) {
			while (writtenCharsInChunk < 8) {
				result += "=";
				writtenCharsInChunk++;
			}
		}
	}
	return result;
}

export function decodeBase32(encoded: string): Uint8Array {
	return decodeBase32_internal(encoded, base32DecodeMap, DecodingPadding.Required);
}

export function decodeBase32IgnorePadding(encoded: string): Uint8Array {
	return decodeBase32_internal(encoded, base32DecodeMap, DecodingPadding.Ignore);
}

function decodeBase32_internal(
	encoded: string,
	decodeMap: Record<string, number>,
	padding: DecodingPadding
): Uint8Array {
	const result = new Uint8Array(Math.ceil(encoded.length / 8) * 5);
	let size = 0;
	let buffer = 0;
	let bufferSize = 0;
	let padded = false;
	for (let i = 0; i < encoded.length; i += 8) {
		if (padded) {
			throw new Error("Invalid padding");
		}
		for (let j = 0; j < 8; j++) {
			if (i + j >= encoded.length) {
				if (padding === DecodingPadding.Required) {
					throw new Error("Invalid padding");
				}
				break;
			}
			if (encoded[i + j] === "=") {
				if (bufferSize === 0 || buffer !== 0) {
					throw new Error("Invalid padding");
				}
				padded = true;
				continue;
			}
			if (padded) {
				throw new Error("Invalid padding");
			}
			if (!(encoded[i + j] in decodeMap)) {
				throw new Error("Invalid character");
			}
			buffer = (buffer << 5) | decodeMap[encoded[i + j]]; // Append 5 bits
			bufferSize += 5;
			while (bufferSize >= 8) {
				result[size] = buffer >> (bufferSize - 8);
				size++;
				buffer &= (1 << (bufferSize - 8)) - 1; // Remove leading 8 bits
				bufferSize -= 8;
			}
		}
	}
	return result.slice(0, size);
}

const base32UpperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const base32LowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz234567";

const base32DecodeMap = {
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
	F: 5,
	G: 6,
	H: 7,
	I: 8,
	J: 9,
	K: 10,
	L: 11,
	M: 12,
	N: 13,
	O: 14,
	P: 15,
	Q: 16,
	R: 17,
	S: 18,
	T: 19,
	U: 20,
	V: 21,
	W: 22,
	X: 23,
	Y: 24,
	Z: 25,
	a: 0,
	b: 1,
	c: 2,
	d: 3,
	e: 4,
	f: 5,
	g: 6,
	h: 7,
	i: 8,
	j: 9,
	k: 10,
	l: 11,
	m: 12,
	n: 13,
	o: 14,
	p: 15,
	q: 16,
	r: 17,
	s: 18,
	t: 19,
	u: 20,
	v: 21,
	w: 22,
	x: 23,
	y: 24,
	z: 25,
	"2": 26,
	"3": 27,
	"4": 28,
	"5": 29,
	"6": 30,
	"7": 31
};

enum EncodingPadding {
	Include = 0,
	None
}

enum DecodingPadding {
	Required = 0,
	Ignore
}
