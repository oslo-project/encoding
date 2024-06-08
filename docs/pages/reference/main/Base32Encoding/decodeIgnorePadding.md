---
title: "Base32Encoding.decodeIgnorePadding()"
---

# `Base32Encoding.decodeIgnorePadding()`

Decodes a base 32 encoded string. Accepts data with no or missing padding.

Throws an `Error` if the data is invalid.

## Definition

```ts
function decodeIgnorePadding(data: string): Uint8Array;
```

### Parameters

- `data`
