---
title: "encodeBase32LowerCaseNoPadding()"
---

# encodeBase32LowerCaseNoPadding()

Encodes a byte array into [canonical](https://datatracker.ietf.org/doc/html/rfc4648#autoid-8) base32 based on [RFC 4648 §6](https://datatracker.ietf.org/doc/html/rfc4648#autoid-11) with lower case letters and the padding omitted.

## Definition

```ts
function encodeBase32LowerCaseNoPadding(bytes: Uint8Array): string;
```

### Parameters

- `bytes`
