import { createDatum, sumofAllRemainingData, updatedAllocationsFromBitmask } from './';
import { exampleInput1, exampleInput2, exampleInput3, exampleInput4 } from './input';

describe('docking data', () => {
  describe('part 1', () => {
    describe('parsing', () => {
      it('creates datum[0] as the first data chunk for example 1', () => {
        const datumExample1 = createDatum(exampleInput1);
        expect(datumExample1[0]).toEqual(expect.objectContaining({
          bitMask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
          allocations: {
            7: 101,
            8: 0,
          },
        }));
      });

      it('creates datum[1] as the second data chunk for example 2', () => {
        const datumExample2 = createDatum(exampleInput2);
        expect(datumExample2[1]).toEqual(expect.objectContaining({
          bitMask: '1000101X11001XXX00X01110X1X000XX0100',
          allocations: {
            42362: 2765432,
            20493: 213778,
            52954: 756325,
          },
        }));
      });
    });

    describe('bit masking', () => {
      it('results in a computed value of 64 for the first example at spot 8', () => {
        createDatum(exampleInput1);
        expect(updatedAllocationsFromBitmask[8]).toEqual(64);
      });

      it('results in a computed value of 101 for the first example at spot 7', () => {
        createDatum(exampleInput1);
        expect(updatedAllocationsFromBitmask[7]).toEqual(101);
      });
    });

    describe('solutions', () => {
      it('sums all of the remaining information to be 165 for example 1', () => {
        createDatum(exampleInput1);
        expect(sumofAllRemainingData()).toEqual(165);
      });

      it('sums all of the remaining information to be 229 for example 3', () => {
        createDatum(exampleInput3);
        expect(sumofAllRemainingData()).toEqual(229);
      });

      it('sums all of the remaining information to be 34359738368 for example 4', () => {
        createDatum(exampleInput4);
        expect(sumofAllRemainingData()).toEqual(34359738368);
      });
    });
  });
});
