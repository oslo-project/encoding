---
title: "encodeBase64urlNoPadding()"
---

# encodeBase64urlNoPadding()

Encodes a byte array into [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) base64 with url-safe alphabet based on [RFC 4648 §5](https://datatracker.ietf.org/doc/html/rfc4648#autoid-10) with the padding omitted.

## Definition

```ts
function encodeBase64urlNoPadding(bytes: Uint8Array): string;
```

### Parameters

- `bytes`
