/** ASCII encodes a string into a byte sequence. Throws a `TypeError` on invalid characters. */
export function encodeASCII(s: string): Uint8Array {
	const bytes = new Uint8Array(s.length);
	for (let i = 0; i < s.length; i++) {
		const charCode = s.charCodeAt(i);
		if (Number.isNaN(charCode)) {
			throw new TypeError("Invalid character");
		}
		if (charCode > 0x7f) {
			throw new TypeError("Invalid character");
		}
		bytes[i] = charCode;
	}
	return bytes;
}

/** ASCII decodes a byte sequence into a string. Throws a `TypeError` if the encoding is invalid. */
export function decodeASCII(bytes: Uint8Array): string {
	let s = "";
	for (let i = 0; i < bytes.length; i++) {
		if (bytes[i] > 0x7f) {
			throw new TypeError("Invalid encoding");
		}
		s += String.fromCharCode(bytes[i]);
	}
	return s;
}

/** Reports whether the byte sequence is a valid ASCII encoding. */
export function isValidASCIIEncoding(bytes: Uint8Array): boolean {
	for (let i = 0; i < bytes.length; i++) {
		if (bytes[i] > 0x7f) {
			return false;
		}
	}
	return true;
}
