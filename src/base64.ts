export function encodeBase64(bytes: Uint8Array): string {
	return encodeBase64_internal(bytes, base64Alphabet, EncodingPadding.Include);
}

export function encodeBase64NoPadding(bytes: Uint8Array): string {
	return encodeBase64_internal(bytes, base64Alphabet, EncodingPadding.None);
}

export function encodeBase64url(bytes: Uint8Array): string {
	return encodeBase64_internal(bytes, base64urlAlphabet, EncodingPadding.Include);
}

export function encodeBase64urlNoPadding(bytes: Uint8Array): string {
	return encodeBase64_internal(bytes, base64urlAlphabet, EncodingPadding.None);
}

function encodeBase64_internal(
	bytes: Uint8Array,
	alphabet: string,
	padding: EncodingPadding
): string {
	let result = "";
	for (let i = 0; i < bytes.byteLength; i += 3) {
		let buffer = 0;
		let bufferSize = 0;
		for (let j = 0; j < 3 && i + j < bytes.byteLength; j++) {
			buffer = (buffer << 8) | bytes[i + j];
			bufferSize += 8;
		}
		for (let j = 0; j < 4; j++) {
			if (bufferSize >= 6) {
				result += alphabet[(buffer >> (bufferSize - 6)) & 0x3f];
				bufferSize -= 6;
			} else if (bufferSize > 0) {
				result += alphabet[(buffer << (6 - bufferSize)) & 0x3f];
				bufferSize = 0;
			} else if (padding === EncodingPadding.Include) {
				result += "=";
			}
		}
	}
	return result;
}

const base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64urlAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export function decodeBase64(encoded: string): Uint8Array {
	return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Required);
}

export function decodeBase64IgnorePadding(encoded: string): Uint8Array {
	return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Ignore);
}

export function decodeBase64url(encoded: string): Uint8Array {
	return decodeBase64_internal(encoded, base64urlDecodeMap, DecodingPadding.Required);
}

export function decodeBase64urlIgnorePadding(encoded: string): Uint8Array {
	return decodeBase64_internal(encoded, base64urlDecodeMap, DecodingPadding.Ignore);
}

function decodeBase64_internal(
	encoded: string,
	decodeMap: Record<string, number>,
	padding: DecodingPadding
): Uint8Array {
	const result = new Uint8Array(Math.ceil(encoded.length / 4) * 3);
	let size = 0;
	let buffer = 0;
	let bufferSize = 0;
	let padded = false;
	for (let i = 0; i < encoded.length; i += 4) {
		if (padded) {
			throw new Error("Invalid padding");
		}
		for (let j = 0; j < 4; j++) {
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
			buffer = (buffer << 6) | decodeMap[encoded[i + j]]; // Append 6 bits
			bufferSize += 6;
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

enum EncodingPadding {
	Include = 0,
	None
}

enum DecodingPadding {
	Required = 0,
	Ignore
}

const base64DecodeMap = {
	"0": 52,
	"1": 53,
	"2": 54,
	"3": 55,
	"4": 56,
	"5": 57,
	"6": 58,
	"7": 59,
	"8": 60,
	"9": 61,
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
	a: 26,
	b: 27,
	c: 28,
	d: 29,
	e: 30,
	f: 31,
	g: 32,
	h: 33,
	i: 34,
	j: 35,
	k: 36,
	l: 37,
	m: 38,
	n: 39,
	o: 40,
	p: 41,
	q: 42,
	r: 43,
	s: 44,
	t: 45,
	u: 46,
	v: 47,
	w: 48,
	x: 49,
	y: 50,
	z: 51,
	"+": 62,
	"/": 63
};

const base64urlDecodeMap = {
	"0": 52,
	"1": 53,
	"2": 54,
	"3": 55,
	"4": 56,
	"5": 57,
	"6": 58,
	"7": 59,
	"8": 60,
	"9": 61,
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
	a: 26,
	b: 27,
	c: 28,
	d: 29,
	e: 30,
	f: 31,
	g: 32,
	h: 33,
	i: 34,
	j: 35,
	k: 36,
	l: 37,
	m: 38,
	n: 39,
	o: 40,
	p: 41,
	q: 42,
	r: 43,
	s: 44,
	t: 45,
	u: 46,
	v: 47,
	w: 48,
	x: 49,
	y: 50,
	z: 51,
	"-": 62,
	_: 63
};
