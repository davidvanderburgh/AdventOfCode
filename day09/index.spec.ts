import { createEncoder, encryptionWeakness, isSumOfTwoInSet, sumOfSet, theBadNumber } from '.';
import { exampleInput } from './input';

describe('encoding error', () => {
  const encoder = createEncoder(exampleInput, 5);
  describe('part 1', () => {
    it('parses the input to be an Encoder', () => {
      expect(encoder).toEqual({
        preambleSize: 5,
        preambleStartPosition: 0,
        numbers: [
          35,
          20,
          15,
          25,
          47,
          40,
          62,
          55,
          65,
          95,
          102,
          117,
          150,
          182,
          127,
          219,
          299,
          277,
          309,
          576,
        ],
      });
    });

    it('returns true for is sum of two', () => {
      expect(isSumOfTwoInSet([ 1,2,3,4,5 ], 8)).toEqual(true);
    });

    it('finds the bad number to be 127 in the example', () => {
      expect(theBadNumber(encoder)).toEqual(127);
    });
  });

  describe('part 2', () => {
    it('finds the sum of the given set', () => {
      expect(sumOfSet([ 1,2,3,4,5 ])).toEqual(15);
    });
    it('finds the encryption weakness to be 62', () => {
      expect(encryptionWeakness(exampleInput, 5)).toEqual(62);
    });
  });
});
