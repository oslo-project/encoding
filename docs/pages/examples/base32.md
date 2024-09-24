---
title: "Base32 encoding"
---

# Base32 encoding

Use `encodeBase32UpperCase()` or `encodeBase32LowerCase()` to encode data with base32. Use `encodeBase32UpperCaseNoPadding()` or `encodeBase32LowerCaseNoPadding()` to omit padding. `decodeBase32()` requires padding while `decodeBase32IgnorePadding()` ignores padding entirely. Both decoding methods are case insensitive.

```ts
import { encodeBase32UpperCase, decodeBase32 } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = encodeBase32UpperCase(data);
const decoded = decodeBase32(encoded);
```
