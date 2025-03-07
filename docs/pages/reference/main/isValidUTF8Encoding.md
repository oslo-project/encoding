---
title: "isValidUTF8Encoding()"
---

# isValidUTF8Encoding()

Reports whether the byte sequence is a valid UTF-8 encoding. Returns `false` on:

- Overlong encodings.
- Code points greater than x10ffff.
- High and low surrogates used by UTF-16.
- Leading continuation byte.
- Non-continuation byte before the end of a character.

```ts
function isValidUTF8Encoding(bytes: Uint8Array): boolean;
```
