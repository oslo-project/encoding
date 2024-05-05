# @oslojs/encoding

A runtime-agnostic TypeScript library for encoding and decoding data with hexadecimal, base32, base64, and base64url schemes. Implementations are based on [RFC 4648](https://www.rfc-editor.org/rfc/rfc4648.html).

Alongside [`@oslojs/binary`]() and [`@oslojs/crypto`](), it aims to provide a basic toolbox for implementing auth and auth-related standards.

```
npm i @oslojs/encoding
```

## Examples

Decode functions and methods throw if the input is invalid.

### Hexadecimal

`encodeHex()` will always output strings in lowercase, while `decodeHex()` accepts both upper and lower case.

```ts
import { encodeHex, decodeHex } from "@oslojs/x/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = encodeHex(data);
const decoded = decodeHex(encoded);
```

### Base32

`Base32Encoding.encode()` includes padding by default and `Base32Encoding.decode()` accepts inputs without proper padding.

```ts
import { base32 } from "@oslojs/x/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = base32.encode(data);
const encoded = base32.encode(data, {
	includePadding: false
});

const decoded = base32.decode("NBSWY3DPEB3W64TMMQ======");
const decoded = base32.decode("NBSWY3DPEB3W64TMMQ======", {
	strict: true // padding required
});
```

### Base64 and Base64url

`Base64Encoding.encode()` includes padding by default and `Base64Encoding.decode()` accepts inputs without proper padding.

`base64url` also adds padding by default.

```ts
import { base64 } from "@oslojs/x/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = base64.encode(data);
const encoded = base64.encode(data, {
	includePadding: false
});

const decoded = base64.decode("aGVsbG8gd29ybGQ=");
const decoded = base64.decode("aGVsbG8gd29ybGQ=", {
	strict: true // padding required
});
```
