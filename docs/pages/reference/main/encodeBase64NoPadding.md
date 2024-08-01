---
title: "encodeBase64NoPadding()"
---

# encodeBase64NoPadding()

Encodes a byte array into [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) base64 based on [RFC 4648 §6](https://datatracker.ietf.org/doc/html/rfc4648#autoid-11) with the padding omitted.

## Definition

```ts
function encodeBase64NoPadding(bytes: Uint8Array): string;
```

### Parameters

- `bytes`
