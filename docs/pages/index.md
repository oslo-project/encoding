---
title: "@oslojs/encoding documentation"
---

# @oslojs/encoding documentation

A JavaScript library for encoding and decoding data with hexadecimal, base32, base32hex, base64, and base64url schemes.

- Runtime-agnostic
- No third-party dependencies
- Fully typed

```ts
import { base64 } from "@oslojs/encoding";

const data: Uint8Array = new TextEncoder().encode("hello world");
const encoded = base64.encode(data);
const decoded = base64.decode(encoded);
```

Alongside [`@oslojs/binary`](https://binary.oslojs.dev) and [`@oslojs/crypto`](https://crypto.oslojs.dev), it aims to provide a basic toolbox for implementing auth and auth-related standards.

## Installation

```
npm i @oslojs/encoding
```
