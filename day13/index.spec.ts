import { BusTimes } from './';
import { exampleInput } from './input';

describe('shuttle search', () => {
  describe('part 1', () => {
    const busTimes = new BusTimes(exampleInput);

    describe('parsing', () => {
      it('sets the arrival time to 939', () => {
        expect(busTimes.arrivalTime).toEqual(939);
      });

      it('sets the bus ids to 7,13,59,31,19', () => {
        expect(busTimes.buses).toEqual([ 7,13,59,31,19 ]);
      });
    });

    describe('calculation', () => {
      it('finds the earliest bus to take to be 59', () => {
        expect(busTimes.earliestBus).toEqual(59);
      });

      it('finds the wait time to be 5 minutes', () => {
        expect(busTimes.waitTime).toEqual(5);
      });

      it('finds the busID * waitTime to be 295', () => {
        expect(busTimes.solution()).toEqual(295);
      });
    });
  });
});
