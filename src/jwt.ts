/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description JWT
 */

import { Base64Decoder, Base64Encoder, JWTFixedHeader, TokenMap } from "./declare";
import { fixUndefinableDate, parseJWTToken, stringifyJWTToken } from "./util";

declare const window: any;

export class JWTToken<Header extends Record<string, any>, Body extends Record<string, any>> {

    public static fromTokenOrNull<Header extends Record<string, any>, Body extends Record<string, any>>(
        token: string,
        encoder: Base64Encoder = window.atob,
    ): JWTToken<Header, Body> | null {

        const tokenMap: TokenMap<Header & JWTFixedHeader, Body> | null = parseJWTToken(token, encoder);

        if (!tokenMap) {
            return null;
        }

        return new JWTToken(
            tokenMap.header,
            tokenMap.body,
            tokenMap.signature,
        );
    }

    public static fromTokenOrUndefined<Header extends Record<string, any>, Body extends Record<string, any>>(
        token: string,
        encoder: Base64Encoder = window.atob,
    ): JWTToken<Header, Body> | undefined {

        const instance: JWTToken<Header, Body> | null = JWTToken.fromTokenOrNull<Header, Body>(token, encoder);

        if (instance === null) {
            return undefined;
        }

        return instance;
    }

    public static fromTokenOrThrow<Header extends Record<string, any>, Body extends Record<string, any>>(
        token: string,
        encoder: Base64Encoder = window.atob,
        error?: Error,
    ): JWTToken<Header, Body> {

        const instance: JWTToken<Header, Body> | null = JWTToken.fromTokenOrNull<Header, Body>(token, encoder);

        if (instance === null) {
            if (error) {
                throw error;
            }
            throw new Error("[Sudoo-JWT-Web] Invalid Token");
        }

        return instance;
    }

    private readonly _header: Header & JWTFixedHeader;
    private readonly _body: Body;
    private readonly _signature: string;

    private constructor(header: Header & JWTFixedHeader, body: Body, signature: string) {

        this._header = header;
        this._body = body;
        this._signature = signature;
    }

    public get header(): Header & JWTFixedHeader {
        return this._header;
    }
    public get body(): Body {
        return this._body;
    }
    public get signature(): string {
        return this._signature;
    }

    public verifyExpiration(currentTime: Date = new Date()): boolean {

        if (typeof this._header.exp === 'undefined'
            || this._header.exp === null) {
            return true;
        }
        if (typeof this._header.exp !== 'number') {
            return false;
        }

        const fixedTime: number | undefined = fixUndefinableDate(currentTime);

        if (typeof fixedTime !== 'number') {
            return false;
        }
        return fixedTime < this._header.exp;
    }

    public stringify(
        decoder: Base64Decoder = window.btoa,
    ): string {

        return stringifyJWTToken(
            this._header,
            this._body,
            this._signature,
            decoder,
        );
    }
}
