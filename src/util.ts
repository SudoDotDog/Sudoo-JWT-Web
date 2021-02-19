/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Util
 */

import { TokenMap, TokenTuple } from "./declare";

declare const window: any;

export const deconstructJWT = (token: string): TokenTuple => {

    const tuple: TokenTuple = token.split('.') as TokenTuple;

    return tuple;
};

export const verifyTokenPatternByTuple = (tuple: TokenTuple): boolean => {

    if (tuple.length !== 3) {
        return false;
    }
    return true;
};

export const decodeJWTSlice = (
    encoded: string,
    atobFunction: (value: string) => string,
): any => JSON.parse(atobFunction(encoded));

export const parseJWTToken = <Header extends Record<string, any>, Body extends Record<string, any>>(
    token: string,
    atobFunction: (value: string) => string = window.atob,
): TokenMap<Header, Body> | null => {

    const jwtTuple: TokenTuple = deconstructJWT(token);
    const verifyResult: boolean = verifyTokenPatternByTuple(jwtTuple);

    if (!verifyResult) {
        return null;
    }

    const [header, body, signature] = jwtTuple;

    return {
        header: decodeJWTSlice(header, atobFunction),
        body: decodeJWTSlice(body, atobFunction),
        signature,
    };
};
