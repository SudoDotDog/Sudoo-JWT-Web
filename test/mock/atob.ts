/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Atob
 * @package Mock
 */

export const mockAtobFunction = (value: string): string => {
    return Buffer.from(value, 'base64').toString('binary');
};
