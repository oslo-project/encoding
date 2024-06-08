---
title: "Base64Encoding.decode()"
---

# `Base64Encoding.decode()`

Decodes a base 64 encoded string. Input must have proper padding.

Throws an `Error` if the data is invalid or missing padding.

## Definition

```ts
function decode(data: string): Uint8Array;
```

### Parameters

- `data`
