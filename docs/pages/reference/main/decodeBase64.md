---
title: "decodeBase64()"
---

# decodeBase64()

Decodes a base64 encoded string into a byte array based on [RFC 4648 §4](https://datatracker.ietf.org/doc/html/rfc4648#autoid-9). The string must be [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) and include padding. Throws an `Error` if the encoding is invalid.

## Definition

```ts
function decodeBase64(encoded: string): Uint8Array;
```

### Parameters

- `encoded`
