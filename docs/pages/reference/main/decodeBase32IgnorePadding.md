---
title: "decodeBase32IgnorePadding()"
---

# decodeBase32IgnorePadding()

Decodes a base32 encoded string into a byte array based on [RFC 4648 §6](https://datatracker.ietf.org/doc/html/rfc4648#autoid-11). The string must be [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) but can be partially or fully missing its padding. Throws an `Error` if the encoding is invalid.

## Definition

```ts
function decodeBase32IgnorePadding(encoded: string): Uint8Array;
```

### Parameters

- `encoded`
