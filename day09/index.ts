import { input } from './input';

interface Encoder {
  preambleSize: number,
  preambleStartPosition: number,
  numbers: number[],
}

export const createEncoder = (input: string, preambleSize: number): Encoder => {
  const inputLines: string[] = input.split('\n');
  const numbers: number[] = [];
  inputLines.forEach((inputLine) => {
    numbers.push(parseInt(inputLine));
  });

  return {
    preambleSize,
    preambleStartPosition: 0,
    numbers,
  };
};

export const theBadNumber = (encoder: Encoder): number => {
  let result = 0;

  for (let i = 0; i < encoder.numbers.length - encoder.preambleSize - 1; i++) {
    if (!isSumOfTwoInSet(
      encoder.numbers.slice(i, i + encoder.preambleSize),
      encoder.numbers[i + encoder.preambleSize],
    )) {
      result = encoder.numbers[i + encoder.preambleSize];
    }
  }

  return result;
};

export const isSumOfTwoInSet = (numbers: number[], sum: number): boolean => {
  let result = false;
  numbers.forEach((number, i) => {
    const numbersCopy = numbers.slice();
    const firstNumber: number = (numbersCopy.splice(i, 1))[0];

    numbersCopy.forEach((number) => {
      if (firstNumber + number === sum) {
        result = true;
        return;
      }
    });
  });

  return result;
};

export const encryptionWeakness = (input: string, preambleSize: number): number => {
  const encoder: Encoder = createEncoder(input, preambleSize);
  const badNumber: number = theBadNumber(encoder);

  let startIndex = 0;
  let endIndex = 1;
  while (endIndex < encoder.numbers.indexOf(badNumber)) {
    const trialArray = encoder.numbers.slice(startIndex, endIndex);
    const sumOfTrialArrayNumbers: number = sumOfSet(trialArray);

    if (sumOfTrialArrayNumbers < badNumber) {
      endIndex++;
    } else if (sumOfTrialArrayNumbers === badNumber) {
      return (smallestNumberInArray(trialArray) + largestNumberInArray(trialArray));
    } else if (sumOfTrialArrayNumbers > badNumber) {
      startIndex++;
      endIndex = startIndex + 1;
    }
  }

  return 0;
};

const smallestNumberInArray = (numbers: number[]): number => Math.min(...numbers);
const largestNumberInArray = (numbers: number[]): number => Math.max(...numbers);

export const sumOfSet = (numbers: number[]) : number => {
  let sum = 0;
  numbers.forEach((number) => {
    sum += number;
  });
  return sum;
};

console.log(theBadNumber(createEncoder(input, 25)));
console.log(encryptionWeakness(input, 25));