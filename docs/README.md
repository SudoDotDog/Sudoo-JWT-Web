# Sudoo-JWT-Web

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-JWT-Web/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-JWT-Web/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-JWT-Web/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-JWT-Web)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fjwt-web.svg)](https://www.npmjs.com/package/@sudoo/jwt-web)
[![downloads](https://img.shields.io/npm/dm/@sudoo/jwt-web.svg)](https://www.npmjs.com/package/@sudoo/jwt-web)

JWT implementation for Web

## Install

```sh
yarn add @sudoo/jwt-web
# Or
npm install @sudoo/jwt-web --save
```

## Usage

```ts
import { JWTToken } from "@sudoo/jwt-web";

const token: JWTToken<Header, Body> = JWTToken.fromToken(rawToken);

token.header; // Header
token.body; // Body
token.signature; // Signature

token.stringify(); // Re-encode token
```
