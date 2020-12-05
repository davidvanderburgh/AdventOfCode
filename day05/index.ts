import { inputList } from "./input";

interface Range {
    lower: number,
    upper: number,
}

export const calculateRow = (input: string): number => {
    return binarySearch(input, { lower: 0, upper: 127 }, 0, 7);
}

export const calculateColumn = (input: string): number => {
    return binarySearch(input, { lower: 0, upper: 7 }, 7, 10);
}

export const getSeatId = (input: string): number => {
    return calculateRow(input) * 8 + calculateColumn(input);
}

const binarySearch = (
    input: string,
    startingRange: Range,
    start: number,
    end: number,
): number => {
    let currentRange: Range = startingRange;
    for (let i = start; i < end; i++) {
        currentRange = getNewRange(input[i], currentRange);
    }
    return currentRange.lower;
};

export const getNewRange = (letter: string, currentRange: Range): Range => {
    const middlePoint = (currentRange.upper + 1 - currentRange.lower) / 2 +
        currentRange.lower;

    switch (letter) {
        case 'F':
        case 'L':
            return { lower: currentRange.lower, upper: middlePoint - 1 };
        case 'B':
        case 'R':
            return { lower: middlePoint, upper: currentRange.upper };
        default:
            throw new Error(`letter given is wrong: ${letter}`);
    }
};

const getHighestSeatId = (inputList: string): number => {
    let maxId = 0;
    const inputs: string[] = inputList.split('\n');

    inputs.forEach((input) => {
        const seatId = getSeatId(input);
        if (seatId > maxId) {
            maxId = seatId;
        }
    });

    return maxId;
};

const findMySeatId = (inputList: string): number => {
    let seatIds: number[] = [];
    const inputs: string[] = inputList.split('\n');

    inputs.forEach((input) => {
        seatIds.push(getSeatId(input));
    });

    seatIds = seatIds.sort((a, b) => a - b);

    let mySeatId = -1;

    for (let i = 0; i < seatIds.length - 1; i++) {
        if (seatIds[i + 1] !== seatIds[i] + 1) {
            mySeatId = seatIds[i] + 1;
        }
    };

    return mySeatId;
};  

console.log(getHighestSeatId(inputList));
console.log(findMySeatId(inputList));