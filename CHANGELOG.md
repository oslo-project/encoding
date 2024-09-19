# @oslojs/encoding

## 1.0.0

- No changes.

## 0.4.1

- Remove redundant code.

## 0.4.0

- [Breaking] Replace `base64`, `bas64url`, and `base32`
- [Breaking] Remove `base32`
- [Breaking] Replace `encodeHex()` with `encodeHexLowerCase()` and `encodeHexUpperCase()`.
- [Breaking] Remove `Encoding` interface.

## 0.3.0

- [Breaking] Add `Encoding.encodeNoPadding()` and `Encoding.decodeIgnorePadding()`
- [Breaking] Remove `includingPadding` option from `Base64Encoding.encode()` and `Base32Encoding.encode()`
- [Breaking] Remove `strict` option from `Base64Encoding.decodeIgnorePadding()` and `Base32Encoding.decodeIgnorePadding()`
- Add `Encoding.encodeNoPadding()`, `Base64Encoding.encodeNoPadding()`, `Base32Encoding.encodeNoPadding()`
- Add `Encoding.decodeIgnorePadding()`, `Base64Encoding.decodeIgnorePadding()`, `Base32Encoding.decodeIgnorePadding()`
