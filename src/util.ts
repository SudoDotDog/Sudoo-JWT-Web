/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Util
 */

import { deconstructJWTEnsure, formatTokenByStructure, TokenMap, TokenTuple, verifyTokenPatternByTuple } from "@sudoo/jwt-config";
import { Base64Decoder, Base64Encoder } from "./declare";

export const decodeJWTSlice = (
    encoded: string,
    decoder: Base64Decoder,
): any => JSON.parse(decoder(encoded));

export const encodeJWTSlice = (
    original: any,
    encoder: Base64Encoder,
): any => {

    const encoded: string = encoder(JSON.stringify(original));
    return encoded.replace(/=/g, '');
};

export const parseJWTToken = <Header extends Record<string, any>, Body extends Record<string, any>>(
    token: string,
    encoder: Base64Encoder,
): TokenMap<Header, Body> | null => {

    const jwtTuple: TokenTuple = deconstructJWTEnsure(token);
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

    const jwtToken = formatTokenByStructure({
        header: encodedHeader,
        body: encodedBody,
        signature,
    });

    return jwtToken;
};
