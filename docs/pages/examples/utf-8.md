---
title: "UTF-8"
---

# UTF-8

Use `encodeUTF8()` to UTF-8 encode strings to byte sequences. Use `decodeUTF8()` to decode into a string or use `decodeUTF8IntoCodePoints()` to decode into an array of Unicode code points.

Use `isValidUTF8Encoding()` to validate a UTF-8 byte sequence without decoding it.

```ts
import {
	encodeUTF8,
	decodeUTF8,
	decodeUTF8IntoCodePoints,
	isValidUTF8Encoding
} from "@oslojs/encoding";

const encoded = encodeUTF8("Hello world!");
const decoded = decodeUTF8(encoded);
const decodedCodePoints = decodeUTF8IntoCodePoints(encoded);
const valid = isValidUTF8Encoding(encoded);
```
