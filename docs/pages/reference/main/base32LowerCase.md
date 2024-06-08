---
title: "base32LowerCase"
---

# `base32LowerCase`

Implements Base32 based on [RFC 4648 §6](https://datatracker.ietf.org/doc/html/rfc4648#section-6) with [`Base32Encoding`](/reference/main/Base32Encoding).

Uses lowercase letters.

```ts
import { base32LowerCase } from "oslo/encoding";

const encoded = base32LowerCase.encode(message);
const decoded = base32LowerCase.decodeIgnorePadding(encoded);
```
