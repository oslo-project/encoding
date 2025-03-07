---
title: "Base64 encoding"
---

# Base64 encoding

Use `encodeBase64()` or `encodeBase64NoPadding()` to omit padding. `decodeBase64()` requires padding while `decodeBase64IgnorePadding()` ignores padding entirely. A URL-safe variant (base64url) versions for each method is also available.

```ts
import { encodeBase64, decodeBase64 } from "@oslojs/encoding";

const data = new Uint8Array();
const encoded = encodeBase64(data);
const decoded = decodeBase64(encoded);
```

```ts
import { encodeBase64NoPadding, decodeBase64IgnorePadding } from "@oslojs/encoding";

const data = new Uint8Array();
const encoded = encodeBase64NoPadding(data);
const decoded = decodeBase64IgnorePadding(encoded);
```

```ts
import { encodeBase64url, decodeBase64url } from "@oslojs/encoding";

const data = new Uint8Array();
const encoded = encodeBase64url(data);
const decoded = decodeBase64url(encoded);
```

```ts
import { encodeBase64, decodeBase64 } from "@oslojs/encoding";

const data = new Uint8Array();
const encoded = encodeBase64(data);
const decoded = decodeBase64(encoded);
```

```ts
import { encodeBase64urlNoPadding, decodeBase64urlIgnorePadding } from "@oslojs/encoding";

const data = new Uint8Array();
const encoded = encodeBase64urlNoPadding(data);
const decoded = decodeBase64urlIgnorePadding(encoded);
```

To encode strings, use [`encodeUTF8()`](/examples/utf-8) to UTF-8 encode it first.

```ts
import { encodeUTF8, encodeBase64 } from "@oslojs/encoding";

const data = encodeUTF8("Hello world!");
const encoded = encodeBase64(data);
```
