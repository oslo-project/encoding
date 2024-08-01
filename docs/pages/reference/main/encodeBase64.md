---
title: "encodeBase64()"
---

# encodeBase64()

Encodes a byte array into [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) base64 based on [RFC 4648 §4](https://datatracker.ietf.org/doc/html/rfc4648#autoid-9) with padding.

## Definition

```ts
function encodeBase64(bytes: Uint8Array): string;
```

### Parameters

- `bytes`
