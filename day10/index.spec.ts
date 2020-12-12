import { Adapter, calculateSolution, createAdapters, numberOfDistinctPaths } from './';
import { exampleInput, largeExampleInput } from './input';

describe('adapter array', () => {
  const exampleAdapters: Adapter[] = createAdapters(exampleInput);

  describe('part 1', () => {
    it('calculates the highest rating to be 22 jolts', () => {
      // expect(calculateHighestRating(exampleAdapters)).toEqual(22);
    });

    it('calculates 35 for the example solution', () => {
      expect(calculateSolution(exampleAdapters)).toEqual(35);
    });
  });

  describe('part 2', () => {
    it('calculates 8 distinct arrangements for the first example', () => {
      expect(numberOfDistinctPaths(exampleInput)).toEqual(8);
    });

    it('calculates 19208 distinct arrangements for the large example', () => {
      expect(numberOfDistinctPaths(largeExampleInput)).toEqual(19208);
    });
  });
});
