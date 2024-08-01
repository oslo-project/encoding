---
title: "Hex encoding"
---

# Hex encoding

Use `encodeHexUpperCase()` or `encodeHexLowerCase()` to encode data and `decodeHex()` to decode hex-encoded strings. `decodeHex()` is case-insensitive.

```ts
import { encodeUpperCase, encodeHexLowerCase, decodeHex } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const hex = encodeHexUpperCase(data);
const hex = encodeHexLowerCase(data);
const decoded = decodeHex(hex);
```
