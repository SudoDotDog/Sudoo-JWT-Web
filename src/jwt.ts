/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description JWT
 */

import { TokenMap } from "./declare";
import { parseJWTToken } from "./util";

export class JWTToken<Header extends Record<string, any>, Body extends Record<string, any>> {

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public static fromString<Header extends Record<string, any>, Body extends Record<string, any>>(token: string): JWTToken<Header, Body> {

        const tokenMap: TokenMap<Header, Body> = parseJWTToken(token);

        return new JWTToken(tokenMap.header, tokenMap.body, tokenMap.signature);
    }

    private readonly _header: Header;
    private readonly _body: Body;
    private readonly _signature: string;

    private constructor(header: Header, body: Body, signature: string) {

        this._header = header;
        this._body = body;
        this._signature = signature;
    }
}
