---
title: "Base32 encoding"
---

# Base32 encoding

Use `encodeBase32()` or `encodeBase32NoPadding()` to omit padding. Letters are in upper case. `decodeBase32()` requires padding while `decodeBase32IgnorePadding()` ignores padding entirely. Both decoding methods are case insensitive.

```ts
import { encodeBase32, decodeBase32 } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = encodeBase32(data);
const decoded = decodeBase32(encoded);
```
