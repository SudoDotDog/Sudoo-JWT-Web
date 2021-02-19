/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { TokenTuple } from '../../src/declare';
import { verifyTokenPatternByTuple } from '../../src/util';

describe('Given [Util] help methods', (): void => {

    const chance: Chance.Chance = new Chance('jwt-web-util');

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
});
