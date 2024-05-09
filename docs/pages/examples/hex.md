---
title: "Hex encoding"
---

# Hex encoding

Use [`encodeHex()`](/reference/main/encodeHex) and [`decodeHex()`](/reference/main/decodeHex) to encode and decode data with hex.

```ts
import { encodeHex, decodeHex } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const hex = encodeHex(data);
const decoded = decodeHex(hex);
```
