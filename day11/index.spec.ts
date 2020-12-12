import { SeatingSystem } from './';
import { exampleInput } from './input';

describe('seating system', () => {
  describe('part 1', () => {
    const seatingSystem = new SeatingSystem(exampleInput);
    seatingSystem.simulateFinalOccupiedSeats();

    it('creates an initial grid from the input', () => {
      expect(seatingSystem.seatingGrids[0]).toEqual([
        [ 'L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L','L' ],
        [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L','L' ],
        [ 'L', '.', 'L', '.', 'L', '.', '.', 'L', '.','.' ],
        [ 'L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L','L' ],
        [ 'L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L','L' ],
        [ 'L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L','L' ],
        [ '.', '.', 'L', '.', 'L', '.', '.', '.', '.','.' ],
        [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L','L' ],
        [ 'L', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.','L' ],
        [ 'L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L','L' ],
      ]);
    });

    it('creates the first iteration grid', () => {
      expect(seatingSystem.seatingGrids[1]).toEqual([
        [ '#', '.', '#', '#', '.', '#', '#', '.', '#', '#' ],
        [ '#', '#', '#', '#', '#', '#', '#', '.', '#', '#' ],
        [ '#', '.', '#', '.', '#', '.', '.', '#', '.', '.' ],
        [ '#', '#', '#', '#', '.', '#', '#', '.', '#', '#' ],
        [ '#', '.', '#', '#', '.', '#', '#', '.', '#', '#' ],
        [ '#', '.', '#', '#', '#', '#', '#', '.', '#', '#' ],
        [ '.', '.', '#', '.', '#', '.', '.', '.', '.', '.' ],
        [ '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ],
        [ '#', '.', '#', '#', '#', '#', '#', '#', '.', '#' ],
        [ '#', '.', '#', '#', '#', '#', '#', '.', '#', '#' ],
      ]);
    });

    it('creates the second iteration grid', () => {
      expect(seatingSystem.seatingGrids[2]).toEqual([
        [ '#', '.', 'L', 'L', '.', 'L', '#', '.', '#', '#' ],
        [ '#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', '#' ],
        [ 'L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.' ],
        [ '#', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', '#' ],
        [ '#', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L' ],
        [ '#', '.', 'L', 'L', 'L', 'L', '#', '.', '#', '#' ],
        [ '.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.' ],
        [ '#', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '#' ],
        [ '#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L' ],
        [ '#', '.', '#', 'L', 'L', 'L', 'L', '.', '#', '#' ],
      ]);
    });

    it('creates the last iteration grid', () => {
      expect(seatingSystem.seatingGrids[seatingSystem.seatingGrids.length - 1]).toEqual([
        [ '#', '.', '#', 'L', '.', 'L', '#', '.', '#', '#' ],
        [ '#', 'L', 'L', 'L', '#', 'L', 'L', '.', 'L', '#' ],
        [ 'L', '.', '#', '.', 'L', '.', '.', '#', '.', '.' ],
        [ '#', 'L', '#', '#', '.', '#', '#', '.', 'L', '#' ],
        [ '#', '.', '#', 'L', '.', 'L', 'L', '.', 'L', 'L' ],
        [ '#', '.', '#', 'L', '#', 'L', '#', '.', '#', '#' ],
        [ '.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.' ],
        [ '#', 'L', '#', 'L', '#', '#', 'L', '#', 'L', '#' ],
        [ '#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L' ],
        [ '#', '.', '#', 'L', '#', 'L', '#', '.', '#', '#' ],
      ]);
    });

    it('eventually settles to 37 occupied seats in the example', () => {
      expect(seatingSystem.simulateFinalOccupiedSeats()).toEqual(37);
    });
  });
});
