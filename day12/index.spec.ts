import { Ferry } from './';
import { exampleInput } from './input';

describe('rain risk', () => {
  describe('parsing', () => {
    let ferry: Ferry;
    beforeEach(() => {
      ferry = new Ferry(exampleInput);
    });

    it('creates an instruction list from the example', () => {
      expect(ferry.instructions).toEqual([
        { command: 'F', argument: 10 },
        { command: 'N', argument: 3 },
        { command: 'F', argument: 7 },
        { command: 'R', argument: 90 },
        { command: 'F', argument: 11 },
      ]);
    });

    it('changes the heading appropriately for 90 degree CW increments', () => {
      ferry.changeHeading('R', 90);
      expect(ferry.heading).toEqual('S');

      ferry.changeHeading('R', 90);
      expect(ferry.heading).toEqual('W');

      ferry.changeHeading('R', 90);
      expect(ferry.heading).toEqual('N');

      ferry.changeHeading('R', 90);
      expect(ferry.heading).toEqual('E');
    });

    it('changes the heading appropriately for 90 degree CCW increments', () => {
      ferry.changeHeading('L', 90);
      expect(ferry.heading).toEqual('N');

      ferry.changeHeading('L', 90);
      expect(ferry.heading).toEqual('W');

      ferry.changeHeading('L', 90);
      expect(ferry.heading).toEqual('S');

      ferry.changeHeading('L', 90);
      expect(ferry.heading).toEqual('E');
    });

    it('changes the heading appropriately for 180 degree CW increments', () => {
      ferry.changeHeading('R', 180);
      expect(ferry.heading).toEqual('W');

      ferry.changeHeading('R', 180);
      expect(ferry.heading).toEqual('E');
    });

    it('changes the heading appropriately for 180 degree CCW increments', () => {
      ferry.changeHeading('L', 180);
      expect(ferry.heading).toEqual('W');

      ferry.changeHeading('L', 180);
      expect(ferry.heading).toEqual('E');
    });

    it('executes the instructions to get the final position', () => {
      ferry.executeInstructions();
      expect(ferry.position).toEqual({ x: 17, y: -8 });
    });

    it('finds the final manhattan distance to be 25', () => {
      ferry.executeInstructions();
      expect(ferry.manhattanDistance()).toEqual(25);
    });
  });
});
