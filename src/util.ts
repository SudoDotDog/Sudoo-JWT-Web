/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Util
 */

import { Base64Decoder, Base64Encoder, TokenMap, TokenTuple } from "./declare";

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
    encoder: Base64Encoder,
): any => JSON.parse(encoder(encoded));

export const encodeJWTSlice = (
    original: any,
    decoder: Base64Decoder,
): any => decoder(JSON.stringify(original));

export const parseJWTToken = <Header extends Record<string, any>, Body extends Record<string, any>>(
    token: string,
    encoder: Base64Encoder,
): TokenMap<Header, Body> | null => {

    const jwtTuple: TokenTuple = deconstructJWT(token);
    const verifyResult: boolean = verifyTokenPatternByTuple(jwtTuple);

    if (!verifyResult) {
        return null;
    }

    const [header, body, signature] = jwtTuple;

    return {
        header: decodeJWTSlice(header, encoder),
        body: decodeJWTSlice(body, encoder),
        signature,
    };
};

export const stringifyJWTToken = <Header extends Record<string, any>, Body extends Record<string, any>>(
    header: Header,
    body: Body,
    signature: string,
    decoder: Base64Decoder,
): string => {

    const encodedHeader: string = encodeJWTSlice(header, decoder);
    const encodedBody: string = encodeJWTSlice(body, decoder);

    const jwtToken = `${encodedHeader}.${encodedBody}.${signature}`;

    return jwtToken;
};
