/**
 * @author WMXPY
 * @namespace JWT_Web
 * @description Atob
 * @package Mock
 */

export const mockAtobFunction = (value: string): string => {

    const buffer: Buffer = Buffer.from(value, 'base64');
    const content: string = buffer.toString('utf8');
    return content;
};

export const mockBtoaFunction = (value: string): string => {

    const buffer: Buffer = Buffer.from(value);
    return buffer.toString('base64');
};
