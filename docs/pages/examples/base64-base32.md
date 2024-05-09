---
title: "Base64 and Base32 encoding"
---

# Base64 and Base32 encoding

Use the `encode()` and `decode()` methods in [`base64`](/reference/main/base64) to encode and decode data with Base64. [`base64url`](/reference/main/base64url), [`base32`](/reference/main/base32) (RFC 4648), and [`base32hex`](/reference/main/base32hex) are also available with the exact same API.

```ts
import { base64, base64url, base32 } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = base64.encode(data);
const decoded = base64.decode(encoded);
```
