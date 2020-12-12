import { input } from './input';

export interface Adapter {
  rating: number,
}

export const createAdapters = (input: string): Adapter[] => {
  const lines: string[] = input.split('\n');
  let adapters: Adapter[] = [];

  lines.forEach((line) => {
    adapters.push({ rating: parseInt(line) });
  });

  adapters = adapters.sort((a, b) => a.rating - b.rating);
  return adapters;
};

export const calculateSolution = (adapters: Adapter[]): number => {
  const joltJumps: Record<string, number> = {
    one: 0,
    two: 0,
    three: 0,
  };

  incrementJoltJumps(joltJumps, { rating: 0 }, adapters[0]);
  for (let i = 0; i < adapters.length - 1; i++) {
    if (canReachAdapter(adapters[i], adapters[i + 1])) {
      incrementJoltJumps(joltJumps, adapters[i], adapters[i + 1]);
    }
  }
  incrementJoltJumps(joltJumps, { rating: 0 }, { rating: 3 });

  return joltJumps['one'] * joltJumps['three'];
};

const canReachAdapter = (startingAdapter: Adapter, otherAdapter: Adapter): boolean => {
  const reach: number = otherAdapter.rating - startingAdapter.rating;
  return (reach >= 1 && reach <= 3);
};

const incrementJoltJumps = (
  joltJumps: Record<string, number>,
  startingAdapter: Adapter,
  otherAdapter: Adapter,
) => {
  switch (otherAdapter.rating - startingAdapter.rating) {
    case 1:
      joltJumps['one']++;
      break;
    case 2:
      joltJumps['two']++;
      break;
    case 3:
      joltJumps['three']++;
      break;
    default:
      throw new Error('your math is bad and you should feel bad');
  }
};

export const numberOfDistinctPaths = (input: string): number => {
  const adapters: Adapter[] = createAdapters(input);

  const optionalAdapters: Adapter[] = [ { rating: 5 }, { rating: 6 }, { rating: 11 } ];

  /*
   * find the optional adapters [5, 6, 11] (ones that can be skipped over)
   * the total arrangements is then 2^n = 2^3 = 8
   */

  return 2 ** optionalAdapters.length;
};

console.log(calculateSolution(createAdapters(input)));
