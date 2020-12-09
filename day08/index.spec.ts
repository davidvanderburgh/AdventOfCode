import { Handheld, OperationArgument, parseInput, processHandheld, processHandheldPart2 } from './';
import { exampleInput } from './input';

describe('handheld halting', () => {
  describe('part 1', () => {
    describe('parsing instructions', () => {
      const operationArgumentOrder: OperationArgument[] = parseInput(exampleInput);

      const testExampleItem = (index: number, operation: string, argument: number): void => {
        it(`knows operationArgumentOrder[${index}] is ${operation} ${argument}`, () => {
          expect(operationArgumentOrder[index]).toEqual({
            operation,
            argument,
            visited: false,
          });
        });
      };

      testExampleItem(0, 'nop', 0);
      testExampleItem(1, 'acc', 1);
      testExampleItem(2, 'jmp', 4);
      testExampleItem(3, 'acc', 3);
      testExampleItem(4, 'jmp', -3);
      testExampleItem(5, 'acc', -99);
      testExampleItem(6, 'acc', 1);
      testExampleItem(7, 'jmp', -4);
      testExampleItem(8, 'acc', 6);
    });

    describe('running the program', () => {
      const handheld: Handheld = {
        accumulator: 0,
        operationArguments: parseInput(exampleInput),
      };
      it('accumulates to 5 for the given example', () => {
        expect(processHandheld(handheld).accumulator).toEqual(5);
      });
    });
  });

  describe('part 2', () => {
    it('accumulates to 8 for the given example', () => {
      expect(processHandheldPart2(exampleInput)).toEqual(8);
    });
  });
});
