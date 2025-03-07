---
title: "encodeUTF8()"
---

# encodeUTF8()

UTF-8 encodes a string into a byte sequence. Throws a `TypeError` on invalid code points:

- Code points greater than 0x10ffff.
- High and low surrogates used by UTF-16.

```ts
function encodeUTF8(s: string): Uint8Array;
```
