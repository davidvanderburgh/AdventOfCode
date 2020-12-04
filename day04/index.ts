import { input } from "./input";

export class Passport {
    public byr: string;
    public iyr: string;
    public eyr: string;
    public hgt: string;
    public hcl: string;
    public ecl: string;
    public pid: string;
    public cid: string;

    private passportMap: Map<string, string> = new Map<string,string>();

    constructor(input: string) {
        this.parseInput(input);
    }

    public parseInput (input:string): void {
        const pairs: string[] = input.split(/ |\n/);

        pairs.forEach((pair) => {
            const keyValuePair: string[] = pair.split(':');
            this.passportMap.set(keyValuePair[0], keyValuePair[1]);
        });
        
        this.byr = this.passportMap.get('byr');
        this.iyr = this.passportMap.get('iyr');
        this.eyr = this.passportMap.get('eyr');
        this.hgt = this.passportMap.get('hgt');
        this.hcl = this.passportMap.get('hcl');
        this.eyr = this.passportMap.get('eyr');
        this.ecl = this.passportMap.get('ecl');
        this.pid = this.passportMap.get('pid');
        this.cid = this.passportMap.get('cid');
    }

    public isPassportValid (): boolean {
        return (this.isValidBirthyear() &&
            this.isValidIssueYear() &&
            this.isValidExpirationYear() &&
            this.isValidHeight() &&
            this.isValidHairColor() &&
            this.isValidEyeColor() &&
            this.isValidPassportId());
    }

    private isValidBirthyear (): boolean {
        return (this.passportMap.has('byr') && this.validYearWithinBounds(this.byr, 1920, 2002));
    }

    private isValidIssueYear (): boolean {
        return (this.passportMap.has('iyr') && this.validYearWithinBounds(this.iyr, 2010, 2020));
    }

    private isValidExpirationYear (): boolean {
        return (this.passportMap.has('eyr') && this.validYearWithinBounds(this.eyr, 2020, 2030));
    }

    private isValidHeight (): boolean {
        if (this.passportMap.has('hgt')) {
            const heightNumber: number = parseInt(this.hgt.replace(/cm|in/, ''));
            const heightUnits: string =  this.hgt.replace(/\d+/, '');

            switch (heightUnits) {
                case 'cm':
                    return (heightNumber >= 150 && heightNumber <= 193);
                case 'in':
                    return (heightNumber >= 59 && heightNumber <= 76);
                default:
                    return false;
            }
        } else {
            return false;
        }
    }

    private isValidHairColor (): boolean {
        return (this.passportMap.has('hcl') && (this.hcl.match(/#(\d|[a-f])+/g) || []).length === 1);
    }

    private isValidEyeColor (): boolean {
        return (this.passportMap.has('ecl') &&
            (this.ecl.match(/amb|blu|brn|gry|grn|hzl|oth/) || []).length === 1);
    }

    private isValidPassportId (): boolean {
        return (this.passportMap.has('pid') && (this.pid.match(/\d/g) || []).length === 9)
    }

    private validYearWithinBounds (
        value: string,
        lowerLimit: number,
        upperLimit: number,
    ): boolean {
        return (value.length === 4 &&
            parseInt(value) >= lowerLimit &&
            parseInt(value) <= upperLimit);
    }
}

export const countValidPassports = (input: string): number => {
    const passportInputs: string[] = input.split('\n\n');

    let validPassportCount = 0;
    passportInputs.forEach((passportInput) => {
        const passport = new Passport(passportInput);
        if (passport.isPassportValid()) {
            validPassportCount++;
        }
    });

    return validPassportCount;
};

console.log(countValidPassports(input));