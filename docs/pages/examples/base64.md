---
title: "Base64 encoding"
---

# Base64 encoding

Use `encodeBase64()` or `encodeBase64NoPadding()` to omit padding. `decodeBase64()` requires padding while `decodeBase64IgnorePadding()` ignores padding entirely. A URL-safe variant (base64url) versions for each method is also available.

```ts
import { encodeBase64, decodeBase64 } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = encodeBase64(data);
const decoded = decodeBase64(encoded);
```

```ts
import { encodeBase64url, decodeBase64url } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = encodeBase64url(data);
const decoded = decodeBase64url(encoded);
```
