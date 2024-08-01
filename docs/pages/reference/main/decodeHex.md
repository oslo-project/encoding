---
title: "decodeHex()"
---

# decodeHex()

Decodes hex-encoded strings based on [RFC 4648 §8](https://datatracker.ietf.org/doc/html/rfc4648#section-8). This method is case-insensitive and the string can be encoded either with lower case or upper case letters. Throws an `Error` if the hex string is malformed.

## Definition

```ts
function decodeHex(data: string): Uint8Array;
```

### Parameters

- `data`
