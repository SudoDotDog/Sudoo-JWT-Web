/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description JWT
 * @package Unit Test
 */

import { generateKeyPair, KeyPair } from '@sudoo/token';
import { expect } from 'chai';
import * as Chance from 'chance';
import { JWTToken } from '../../src/jwt';
import { convertJSTimeToUnixTime } from '../../src/util';
import { mockAtobFunction, mockBtoaFunction } from '../mock/atob';
import { createMockJWT } from '../mock/token';

describe('Given {JWTToken} Class', (): void => {

    const chance: Chance.Chance = new Chance('jwt-web-jwt');

    const keyPair: KeyPair = generateKeyPair();

    it('should be able to instantiate JWTToken Class', (): void => {

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

        const result: JWTToken<any, any> = JWTToken.fromTokenOrThrow(token, mockAtobFunction);

        expect(result.header).to.be.deep.equal({
            "alg": "RS256",
            "typ": "JWT",
            "iat": convertJSTimeToUnixTime(issuedAt.getTime()),
            [headerKey]: headerValue,
        });
        expect(result.body).to.be.deep.equal({
            [bodyKey]: bodyValue,
        });
    });

    it('should be able to stringify JWTToken Class', (): void => {

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

        const instance: JWTToken<any, any> = JWTToken.fromTokenOrThrow(token, mockAtobFunction);
        const result: string = instance.stringify(mockBtoaFunction);

        expect(result).to.be.equal(token);
    });
});
