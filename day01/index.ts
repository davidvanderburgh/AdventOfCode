import { input } from "./input";

export const findTwoNumbersAnswer = (entry: string): number => {
    const numbers = convertEntryToNumberArray(entry);
    const keyNumbers = computeTwoNumbers(numbers);

    return keyNumbers[0]*keyNumbers[1];
};

const computeTwoNumbers = (numbers: number[]): number[] => {
    let firstNumber: number;
    let secondNumber: number;

    let stop = false;
    for(let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === 2020) {
                firstNumber = numbers[i];
                secondNumber = numbers[j];
                stop = true;
                break;
            }
        }
        if (stop) {
            break;
        }
    }
    return [ firstNumber, secondNumber ];
};

export const findThreeNumbersAnswer = (entry: string): number => {
    const numbers = convertEntryToNumberArray(entry);
    const keyNumbers = computeThreeNumbers(numbers);

    return keyNumbers[0]*keyNumbers[1]*keyNumbers[2];
};

const computeThreeNumbers = (numbers: number[]): number[] => {
    let firstNumber: number;
    let secondNumber: number;
    let thirdNumber: number;

    let stop = false;
    for(let i = 0; i < numbers.length - 2; i++) {
        for (let j = i+1; j < numbers.length - 1; j++) {
            for (let k = j+1; k < numbers.length; k++)
            if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                firstNumber = numbers[i];
                secondNumber = numbers[j];
                thirdNumber = numbers[k];
                stop = true;
                break;
            }
            if (stop) {
                break;
            }
        }
        if (stop) {
            break;
        }
    }
    return [ firstNumber, secondNumber, thirdNumber ];
}

const convertEntryToNumberArray = (entry: string): number[] => {
    const values: string[] = entry.split('\n')
    const numbers: number[] = [];
    values.forEach((value) => {
        numbers.push(parseInt(value));
    });

    return numbers;
};

console.log(findThreeNumbersAnswer(input));