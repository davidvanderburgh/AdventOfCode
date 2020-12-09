import { input } from './input';

export interface Handheld {
  accumulator: number,
  operationArguments: OperationArgument[],
}

export interface OperationArgument {
  operation: string,
  argument: number,
  visited: boolean,
  switched?: boolean,
}

export const parseInput = (input: string): OperationArgument[] => {
  const operationArguments: OperationArgument[] = [];
  input.split('\n').forEach((line) => {
    const [ operationString, argumentString ]: string[] = line.split(' ');
    operationArguments.push({
      operation: operationString,
      argument: parseInt(argumentString),
      visited: false,
    });
  });

  return operationArguments;
};

export const processHandheld = (handheld: Handheld): Handheld => {
  handheld.accumulator = 0;
  let index = 0;
  let currentOperationArgument: OperationArgument;
  while (true) {
    currentOperationArgument = handheld.operationArguments[index];

    if (index === handheld.operationArguments.length) {
      return handheld;
    } else if (!currentOperationArgument.visited) {
      switch (currentOperationArgument.operation) {
        case 'nop':
          index = incrementIndex(index, 1, handheld.operationArguments.length);
          break;
        case 'acc':
          handheld.accumulator = handheld.accumulator + currentOperationArgument.argument;
          index = incrementIndex(index, 1, handheld.operationArguments.length);
          break;
        case 'jmp':
          if (currentOperationArgument.argument !== 0) {
            index = incrementIndex(
              index,
              currentOperationArgument.argument,
              handheld.operationArguments.length,
            );
          } else {
            currentOperationArgument.visited = true;
          }
          break;
        default:
          throw new Error(`"${currentOperationArgument.operation}" is not a valid operation`);
      }
      currentOperationArgument.visited = true;
    } else {
      return handheld;
    }
  }
};

export const processHandheldPart2 = (input: string): number => {
  const numberOfArguments: number = input.split('\n').length;
  for (let i = 0; i < numberOfArguments; i++) {
    let trialHandheld: Handheld = { accumulator: 0, operationArguments: parseInput(input) };
    switchOperationArgument(trialHandheld.operationArguments[i]);
    trialHandheld = processHandheld(trialHandheld);
    if (lastInstructionVisited(trialHandheld)) {
      return trialHandheld.accumulator;
    }
  }
  return 0;
};

const switchOperationArgument = (operationArgument: OperationArgument): void => {
  if (operationArgument.operation === 'jmp') {
    operationArgument.operation = 'nop';
  } else if (operationArgument.operation === 'nop') {
    operationArgument.operation = 'jmp';
  }
};

const lastInstructionVisited = (
  handheld: Handheld,
): boolean => {
  const lastVisited = (handheld.operationArguments[handheld.operationArguments.length - 1].visited);

  return lastVisited;
};

const incrementIndex = (
  index: number,
  incrementor: number,
  operationArgmentsLength: number,
): number => {
  let newIndex = index + incrementor;
  if (newIndex > operationArgmentsLength) {
    while (newIndex > operationArgmentsLength) {
      newIndex -= operationArgmentsLength;
    }
  } else if (newIndex <= 0) {
    while (newIndex <= 0) {
      newIndex += operationArgmentsLength;
    }
  }
  return newIndex;
};

console.log(processHandheldPart2(input));
