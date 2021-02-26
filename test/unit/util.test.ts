/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Util
 * @package Unit Test
 */

import { generateKeyPair, KeyPair } from '@sudoo/token';
import { expect } from 'chai';
import * as Chance from 'chance';
import { TokenMap, TokenTuple } from '../../src/declare';
import { convertJSTimeToUnixTime, parseJWTToken, verifyTokenPatternByTuple } from '../../src/util';
import { mockAtobFunction } from '../mock/atob';
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
