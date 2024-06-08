---
title: "Base64Encoding.decodeIgnorePadding()"
---

# `Base64Encoding.decodeIgnorePadding()`

Decodes a base 64 encoded string. Accepts data with no or missing padding.

Throws an `Error` if the data is invalid.

## Definition

```ts
function decodeIgnorePadding(data: string): Uint8Array;
```

### Parameters

- `data`
