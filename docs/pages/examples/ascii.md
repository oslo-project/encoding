---
title: "ASCII encoding"
---

# ASCII

Use `encodeASCII()` to ASCII encode strings to byte sequences. Use `decodeASCII()` to decode into a string.

Use `isValidASCIIEncoding()` to validate an ASCII byte sequence without decoding it.

```ts
import { encodeASCII, decodeASCII, isValidASCIIEncoding } from "@oslojs/encoding";

const encoded = encodeASCII("Hello world!");
const decoded = decodeASCII(encoded);
const valid = isValidASCIIEncoding(encoded);
```
