import { input } from './input';

export let updatedAllocationsFromBitmask: Record<number, number> = {};

class Data {
  constructor (public bitMask: string, public allocations: Record<number, number>) {
    this.setUpdatedAllocationsFromBitmask();
  }

  private setUpdatedAllocationsFromBitmask = (): void => {
    const bitMaskChars: string[] = [ ...this.bitMask ];

    Object.keys(this.allocations).forEach((key) => {
      const valueToMask: string[] = this.getZeroPaddedBinaryStringArray(this.allocations[key]);
      const newValue: string[] = [];

      for (let i = 0; i < bitMaskChars.length; i++) {
        switch (bitMaskChars[i]) {
          case '0':
            newValue.push('0');
            break;
          case '1':
            newValue.push('1');
            break;
          case 'X':
            newValue.push(valueToMask[i]);
            break;
          default:
            throw new Error('not a valid bit mask');
        }
      }
      updatedAllocationsFromBitmask[key] = parseInt(newValue.join(''), 2);
    });
  };

  private getZeroPaddedBinaryStringArray = (value: number): string[] => {
    const binary: string = this.decimalToBinaryString(value);
    const zeroPaddedBinary: string = this.zeroPadBinaryString(binary);
    return [ ...zeroPaddedBinary ];
  }

  private decimalToBinaryString = (decimalValue: number): string =>
    (decimalValue >>> 0).toString(2);

  private zeroPadBinaryString = (binaryString: string): string =>
    '000000000000000000000000000000000000'.substr(binaryString.length) + binaryString;
}

export const createDatum = (input: string): Data[] => {
  updatedAllocationsFromBitmask = {};
  const datum: Data[] = [];
  const chunks: string[] = input.split('mask = ');
  chunks.forEach((chunk) => {
    if (chunk) {
      datum.push(createDataFromChunk(chunk));
    }
  });
  return datum;
};

const createDataFromChunk = (chunk: string): Data => {
  const lines: string[] = chunk.split('\n');

  const bitmask = lines[0];
  const allocations: Record<number, number> = {};

  lines.forEach((line) => {
    const [ leftSide, rightSide ] = line.split(' = ');
    if (leftSide.match(/mem/)) {
      const memorySpot: number = parseInt(leftSide.match(/\d+/)[0]);
      const memoryValue: number = parseInt(rightSide);
      allocations[memorySpot] = memoryValue;
    }
  });

  return new Data(bitmask, allocations);
};

export const sumofAllRemainingData = (): number => {
  let sum = 0;
  Object.keys(updatedAllocationsFromBitmask).forEach((memorySpot) => {
    sum += updatedAllocationsFromBitmask[memorySpot];
  });
  return sum;
};

createDatum(input);
console.log(sumofAllRemainingData());
