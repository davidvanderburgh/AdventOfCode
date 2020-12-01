import { findThreeNumbersAnswer, findTwoNumbersAnswer } from './';

describe('findTwoNumbersAnswer', () => {
    it('passes the given test case', () => {
        const entry = 
        `1721
        979
        366
        299
        675
        1456`;

        const expectedResult = 514579;

        expect(findTwoNumbersAnswer(entry)).toEqual(expectedResult);
    });
});

describe('findThreeNumbersAnswer', () => {
    it('passes the given test case', () => {
        const entry = 
        `1721
        979
        366
        299
        675
        1456`

        const expectedResult = 241861950;

        expect(findThreeNumbersAnswer(entry)).toEqual(expectedResult);
    });
});