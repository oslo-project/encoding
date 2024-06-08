---
title: "Encoding"
---

# Encoding

## Definition

```ts
export interface Encoding {
	encode: (data: Uint8Array) => string;
	encodeNoPadding: (data: Uint8Array) => string;
	decode: (data: string) => Uint8Array;
	decodeRequirePadding: (data: string) => Uint8Array;
}
```

### Methods

- `encode()`: Encodes data with padding.
- `encodeNoPadding()`: Encodes data with no padding.
- `decodeIgnorePadding()`: Accepts data with no padding. Throws an `Error` if the data is invalid.
- `decode()`: Input must have proper padding. Throws an `Error` if the data is invalid or missing padding.
