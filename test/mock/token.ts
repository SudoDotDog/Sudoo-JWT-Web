/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Token
 * @package Mock
 */

import { JWTCreator } from "@sudoo/jwt";
import { KeyPair } from "@sudoo/token";

export const createMockJWT = <Header extends Record<string, any>, Body extends Record<string, any>>(keyPair: KeyPair, header: Header, body: Body): string => {

    const token: JWTCreator = JWTCreator.instantiate(keyPair.private);

    return token.create({
        header,
        body,
    });
};
