/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Util
 * @package Unit Test
 */

import { convertJSTimeToUnixTime, TokenMap, TokenTuple, verifyTokenPatternByTuple } from '@sudoo/jwt-config';
import { generateKeyPair, KeyPair } from '@sudoo/token';
import { expect } from 'chai';
import * as Chance from 'chance';
import { decodeJWTSlice, encodeJWTSlice, parseJWTToken } from '../../src/util';
import { mockAtobFunction, mockBtoaFunction } from '../mock/atob';
import { createMockJWT } from '../mock/token';

describe('Given [Util] help methods', (): void => {

    const chance: Chance.Chance = new Chance('jwt-web-util');

    const keyPair: KeyPair = generateKeyPair();

    it('should be able to deconstruct JWT - happy path', (): void => {

        const header: string = chance.word();
        const body: string = chance.word();
        const signature: string = chance.word();

        const tuple: TokenTuple = [header, body, signature];

        const result: boolean = verifyTokenPatternByTuple(tuple);

        expect(result).to.be.true;
    });

    it('should be able to deconstruct JWT - sad path', (): void => {

        const header: string = chance.word();
        const signature: string = chance.word();

        const tuple: any = [header, signature];

        const result: boolean = verifyTokenPatternByTuple(tuple);

        expect(result).to.be.false;
    });

    // 'ÿ' is UTF-8 0xC3 0xBF — repeating it surfaces bit patterns that map to
    // '+' and '/' under standard base64, catching regressions to non-url-safe
    // output.
    const base64UrlTrigger: string = 'ÿÿÿÿÿÿÿÿÿÿÿÿ';
    const base64UrlAlphabet: RegExp = /^[A-Za-z0-9_-]+$/;

    it('should encode JWT slices using the base64url alphabet', (): void => {

        const encoded: string = encodeJWTSlice({ k: base64UrlTrigger }, mockBtoaFunction);

        expect(encoded).to.match(base64UrlAlphabet);
    });

    it('should round-trip JWT slices via encode/decode', (): void => {

        const source: Record<string, string> = { k: base64UrlTrigger };

        const encoded: string = encodeJWTSlice(source, mockBtoaFunction);
        const decoded: Record<string, string> = decodeJWTSlice(encoded, mockAtobFunction);

        expect(decoded).to.deep.equal(source);
    });

    it('should be able to parse JWT token', (): void => {

        const headerKey: string = chance.string();
        const headerValue: string = chance.string();
        const bodyKey: string = chance.string();
        const bodyValue: string = chance.string();

        const issuedAt: Date = new Date();

        const token: string = createMockJWT(keyPair, {
            [headerKey]: headerValue,
        }, {
            [bodyKey]: bodyValue,
        }, issuedAt);

        const result: TokenMap<any, any> | null = parseJWTToken(token, mockAtobFunction);

        expect(result).to.be.deep.equal({
            body: {
                [bodyKey]: bodyValue,
            },
            header: {
                typ: "JWT",
                alg: "RS256",
                iat: convertJSTimeToUnixTime(issuedAt.getTime()),
                [headerKey]: headerValue,
            },
            signature: token.substring(token.lastIndexOf('.') + 1),
        });
    });
});
