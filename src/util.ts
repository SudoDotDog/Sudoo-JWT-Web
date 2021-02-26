/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Util
 */

import { Base64Decoder, Base64Encoder, TokenMap, TokenTuple } from "./declare";

export const convertJSTimeToUnixTime = (jsTime: number): number => {

    const draftTime: number = jsTime / 1000;
    const roundedTime: number = Math.floor(draftTime);

    return roundedTime;
};

export const getCurrentUnixTime = (): number => {

    return convertJSTimeToUnixTime(Date.now());
};

export const fixUndefinableDate = (target?: Date): number | undefined => {

    if (typeof target === 'undefined') {
        return undefined;
    }

    if (!target.getTime) {
        return undefined;
    }

    const time: number = target.getTime();

    if (isNaN(time)) {
        return undefined;
    }

    return convertJSTimeToUnixTime(time);
};

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
