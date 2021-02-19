/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { JWTCreator } from '../../src';
import { MockKeyPairGenerator } from '../mock/generate';

describe('Given [Util] help methods', (): void => {

    const chance: Chance.Chance = new Chance('jwt-web-util');

    it('should be able to deconstruct JWT', (): void => {

        const creator: JWTCreator = JWTCreator.instantiate(keyPair.singleLinePrivate);

        expect(creator).to.be.instanceOf(JWTCreator);
    });
});
