---
title: "decodeHex()"
---

# `decodeHex()`

Decodes hex-encoded strings based on [RFC 4648 §8](https://datatracker.ietf.org/doc/html/rfc4648#section-8). Supports both lowercase and uppercase hex strings, and throws an `Error` if the hex string is malformed.

## Definition

```ts
function decodeHex(data: string): Uint8Array;
```

### Parameters

- `data`
