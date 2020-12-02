import { input } from './input';

export const calculateNumberOfValidPasswords = (
    input: string,
    passwordMatchingMethod: (policyAndPassword: PolicyAndPassword) => boolean,
): number => {
    const listItems: string[] = input.split('\n');
    let validPasswordNumber = 0;
    listItems.forEach((listItem) => {
        const policyAndPassword = new PolicyAndPassword(listItem);
        if (passwordMatchingMethod(policyAndPassword)) {
            validPasswordNumber++;
        }
    });
    return validPasswordNumber;
};

export class PolicyAndPassword {
    public lowestNumberOfTimesForLetter: number;
    public highestNumberOfTimesForLetter: number;
    public policyLetter: string;
    public password: string;

    constructor (policyAndPassword: string) {
        this.parsePolicyAndPassword(policyAndPassword);
    }

    private parsePolicyAndPassword (policyAndPassword: string): void {
        const parsedValues: string[] = policyAndPassword.split(/-| |: /);
        this.lowestNumberOfTimesForLetter = parseInt(parsedValues[0]);
        this.highestNumberOfTimesForLetter = parseInt(parsedValues[1]);
        this.policyLetter = parsedValues[2];
        this.password = parsedValues[3];
    }
    
    letterInWord (letter: string, word: string) {
        return (word.match(new RegExp(letter, 'g')) || []).length;
      };
}

export const passwordMatchesPolicy = (policyAndPassword: PolicyAndPassword): boolean => {
    let timesGivenLetterAppearsInPassword = policyAndPassword.letterInWord(policyAndPassword.policyLetter, policyAndPassword.password);
    return (timesGivenLetterAppearsInPassword >= policyAndPassword.lowestNumberOfTimesForLetter &&
        timesGivenLetterAppearsInPassword <= policyAndPassword.highestNumberOfTimesForLetter);
}

export const passwordMatchesPolicyPart2 = (policyAndPassword: PolicyAndPassword): boolean => {
    const firstPosition = policyAndPassword.lowestNumberOfTimesForLetter;
    const secondPosition = policyAndPassword.highestNumberOfTimesForLetter;
    
    return ((policyAndPassword.password[firstPosition - 1] === policyAndPassword.policyLetter  && policyAndPassword.password[secondPosition - 1] !== policyAndPassword.policyLetter) || 
        (policyAndPassword.password[firstPosition - 1] !== policyAndPassword.policyLetter  && policyAndPassword.password[secondPosition - 1] === policyAndPassword.policyLetter);
}

console.log(calculateNumberOfValidPasswords(input, passwordMatchesPolicyPart2));