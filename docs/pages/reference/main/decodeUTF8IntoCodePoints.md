---
title: "decodeUTF8()"
---

# decodeUTF8()

UTF-8 decodes a byte sequence into an array of code points (uint32). Throws a `TypeError` on invalid character encodings:

- Overlong encodings.
- Code points greater than x10ffff.
- High and low surrogates used by UTF-16.
- Leading continuation byte.
- Non-continuation byte before the end of a character.

```ts
function decodeUTF8IntoCodePoints(bytes: Uint8Array): Uint32Array;
```
