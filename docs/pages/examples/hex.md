---
title: "Hex encoding"
---

# Hex encoding

Use `encodeHexUpperCase()` or `encodeHexLowerCase()` to encode data and `decodeHex()` to decode hex-encoded strings. `decodeHex()` is case-insensitive.

```ts
import { encodeHexUpperCase, encodeHexLowerCase, decodeHex } from "@oslojs/encoding";

const data = new Uint8Array();
const hex = encodeHexUpperCase(data);
const hex = encodeHexLowerCase(data);
const decoded = decodeHex(hex);
```

To encode strings, use [`encodeUTF8()`](/examples/utf-8) to UTF-8 encode it first.

```ts
import { encode, encodeHexUpperCase } from "@oslojs/encoding";

const data = encodeUTF8("Hello world!");
const encoded = encodeHexUpperCase(data);
```
