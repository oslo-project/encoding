---
title: "base64"
---

# `base64`

Implements Base 64 encoding based on [RFC 4648 §4](https://datatracker.ietf.org/doc/html/rfc4648#section-4) with [`Base64Encoding`](/reference/main/Base64Encoding). Includes padding by default.

```ts
import { base64 } from "oslo/encoding";

const encoded = base64.encode(message);
const decoded = base64.decodeIgnorePadding(encoded);
```
