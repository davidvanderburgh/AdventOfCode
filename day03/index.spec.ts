import { calculateMapHeight, calculateMapWidth, calculateTreesHit, createMap, Slope } from './';
import { exampleInput } from './input';

describe('toboggan trajectory', () => {
    describe('part 1', () => {
        it('calculates the height of the map', () => {
            expect(calculateMapHeight(exampleInput)).toEqual(11);
        });
        
        it('calculates the width of the map', () => {
            expect(calculateMapWidth(exampleInput)).toEqual(11);
        });
    
        it('creates a valid map object', () => {
            const map = createMap(exampleInput);
    
            expect(map[0][0]).toEqual('.');
            expect(map[0][1]).toEqual('.');
            expect(map[0][2]).toEqual('#');
            expect(map[0][3]).toEqual('#');
            expect(map[0][4]).toEqual('.');
            expect(map[0][5]).toEqual('.');
            expect(map[0][6]).toEqual('.');
            expect(map[0][7]).toEqual('.');
            expect(map[0][8]).toEqual('.');
            expect(map[0][9]).toEqual('.');
            expect(map[0][10]).toEqual('.');
    
            expect(map[1][0]).toEqual('#');
            expect(map[1][1]).toEqual('.');
            expect(map[1][2]).toEqual('.');
            expect(map[1][3]).toEqual('.');
            expect(map[1][4]).toEqual('#');
            expect(map[1][5]).toEqual('.');
            expect(map[1][6]).toEqual('.');
            expect(map[1][7]).toEqual('.');
            expect(map[1][8]).toEqual('#');
            expect(map[1][9]).toEqual('.');
            expect(map[1][10]).toEqual('.');
        });
    
        it('calculates 7 tress for the example input', () => {
            const slope: Slope = {
                right: 3,
                down: 1,
            }
    
            expect(calculateTreesHit(exampleInput, slope)).toEqual(7);
        });
    });
    describe('part 2', () => {
        it('calculates 2 for (1,1) slope', () => {
            expect(calculateTreesHit(exampleInput, { right: 1, down: 1})).toEqual(2);
        });
        it('calculates 7 for (3,1) slope', () => {
            expect(calculateTreesHit(exampleInput, { right: 3, down: 1})).toEqual(7);
        });
        it('calculates 3 for (5,1) slope', () => {
            expect(calculateTreesHit(exampleInput, { right: 5, down: 1})).toEqual(3);            
        });
        it('calculates 4 for (7,1) slope', () => {
            expect(calculateTreesHit(exampleInput, { right: 7, down: 1})).toEqual(4);            
        });
        it('calculates 2 for (1,2) slope', () => {
            expect(calculateTreesHit(exampleInput, { right: 1, down: 2})).toEqual(2);            
        });
        it('calculates the product of the given inputs to be 336', () => {
            expect(
                calculateTreesHit(exampleInput, { right: 1, down: 1}) *
                calculateTreesHit(exampleInput, { right: 3, down: 1}) * 
                calculateTreesHit(exampleInput, { right: 5, down: 1}) *
                calculateTreesHit(exampleInput, { right: 7, down: 1}) *
                calculateTreesHit(exampleInput, { right: 1, down: 2})
            ).toEqual(336);
        });
    });
});