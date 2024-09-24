---
title: "encodeBase32LowerCase()"
---

# encodeBase32UpperCase()

Encodes a byte array into [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) base32 based on [RFC 4648 §6](https://datatracker.ietf.org/doc/html/rfc4648#autoid-11) with lower case letters and padding.

## Definition

```ts
function encodeBase32LowerCase(bytes: Uint8Array): string;
```

### Parameters

- `bytes`
