/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Util
 */

import { TokenMap, TokenTuple } from "./declare";

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

export const encodeJWTSlice = (
    original: any,
    btoaFunction: (value: string) => string,
): any => btoaFunction(JSON.stringify(original));

export const parseJWTToken = <Header extends Record<string, any>, Body extends Record<string, any>>(
    token: string,
    atobFunction: (value: string) => string,
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

export const stringifyJWTToken = <Header extends Record<string, any>, Body extends Record<string, any>>(
    header: Header,
    body: Body,
    signature: string,
    btoaFunction: (value: string) => string,
): string => {

    const encodedHeader: string = encodeJWTSlice(header, btoaFunction);
    const encodedBody: string = encodeJWTSlice(body, btoaFunction);

    const jwtToken = `${encodedHeader}.${encodedBody}.${signature}`;

    return jwtToken;
};
