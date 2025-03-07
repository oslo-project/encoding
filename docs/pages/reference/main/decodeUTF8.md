---
title: "decodeUTF8()"
---

# decodeUTF8()

UTF-8 decodes a byte sequence into a string. Throws a `TypeError` on invalid character encodings:

- Overlong encodings.
- Code points greater than x10ffff.
- High and low surrogates used by UTF-16.
- Leading continuation byte.
- Non-continuation byte before the end of a character.

The byte-order mark character is decoded into an empty string.

Since this method throws when the string contains high and low surrogates, it behaves slightly different from the `TextEncoder.encode()` method in the standard web API.

```ts
function decodeUTF8(bytes: Uint8Array): string;
```
