---
title: "Base32Encoding.decode()"
---

# `Base32Encoding.decode()`

Decodes a base 32 encoded string. Input must have proper padding.

Throws an `Error` if the data is invalid or missing padding.

## Definition

```ts
function decode(data: string): Uint8Array;
```

### Parameters

- `data`
