---
title: "base32hexLowerCase"
---

# `base32hexLowerCase`

Implements Base 32 with extended hex alphabet based on [RFC 4648 §7](https://datatracker.ietf.org/doc/html/rfc4648#section-7) with [`Base32Encoding`](/reference/main/Base32Encoding).

Uses lowercase letters.

```ts
import { base32hexLowerCase } from "oslo/encoding";

const encoded = base32hexLowerCase.encode(message);
const decoded = base32hexLowerCase.decodeIgnorePadding(encoded);
```
