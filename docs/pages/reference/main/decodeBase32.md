---
title: "decodeBase32()"
---

# decodeBase32()

Decodes a base32 encoded string into a byte array based on [RFC 4648 §6](https://datatracker.ietf.org/doc/html/rfc4648#autoid-11). The string must be [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) and include padding. This method is case-insensitive and the string can be encoded either with lower case or upper case letters. Throws an `Error` if the encoding is invalid.

## Definition

```ts
function decodeBase32(encoded: string): Uint8Array;
```

### Parameters

- `encoded`
