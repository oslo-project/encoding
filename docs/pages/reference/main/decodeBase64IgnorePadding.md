---
title: "decodeBase64IgnorePadding()"
---

# decodeBase64IgnorePadding()

Decodes a base64 encoded string into a byte array based on [RFC 4648 §5](https://datatracker.ietf.org/doc/html/rfc4648#autoid-10). The string must be [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) but can be partially or fully missing its padding. Throws an `Error` if the encoding is invalid.

## Definition

```ts
function decodeBase64IgnorePadding(encoded: string): Uint8Array;
```

### Parameters

- `encoded`
