import { calculateColumn, calculateRow, getNewRange, getSeatId } from './';

describe('binary boarding', () => {
    beforeEach(() => {
        expect.hasAssertions();
    });

    describe('part 1', () => {
        describe('getNewRange', () => {
            it('gets 0-63 from 0-127 and F', ()=> {
                expect(getNewRange('F', { lower: 0, upper: 127 })).toEqual({
                    lower: 0,
                    upper: 63,
                })
            });
            it('gets 64-127 from 0-127 and B', () => {
                expect(getNewRange('B', { lower: 0, upper: 127 })).toEqual({
                    lower: 64,
                    upper: 127,
                })
            });
            it('gets 44-45 from 44-47 with F', () => {
                expect(getNewRange('F', { lower: 44, upper: 47 })).toEqual({
                    lower: 44,
                    upper: 45,
                })
            });
        });
        
        describe('the first example (BFFFBBFRRR)', () => {
            const input = 'BFFFBBFRRR';
            it('gets row 70', () => {                
                expect(calculateRow(input)).toEqual(70);
            });
            it('gets column 7', () => {
                expect(calculateColumn(input)).toEqual(7);
            });
            it('gets seat ID 567', () => {
                expect(getSeatId(input)).toEqual(567);
            });
        });
        describe('the second example (FFFBBBFRRR)', () => {
            const input = 'FFFBBBFRRR';
            it('gets row 14', () => {
                expect(calculateRow(input)).toEqual(14);
            });
            it('gets column 7', () => {
                expect(calculateColumn(input)).toEqual(7);
            });
            it('gets seat ID 119', () => {
                expect(getSeatId(input)).toEqual(119);
            });
        });
        describe('the third example (BBFFBBFRLL)', () => {
            const input = 'BBFFBBFRLL';
            it('gets row 102', () => {
                expect(calculateRow(input)).toEqual(102);                
            });
            it('gets column 4', () => {
                expect(calculateColumn(input)).toEqual(4);
            });
            it('gets seat ID 820', () => {
                expect(getSeatId(input)).toEqual(820);
            });
        });
    });
});