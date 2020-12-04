import { countValidPassports, Passport } from './';
import { exampleInput } from './input';

describe('passport processing', () => {
    beforeEach(() => {
        expect.hasAssertions();
    });
    describe('part 1', () => {
        describe('property assignment', () => {
            const input = 
            `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
            byr:1937 iyr:2017 cid:147 hgt:183cm`;
            let passport: Passport;

            beforeEach(() => {
                passport = new Passport(input);
            });
            
            it('assigns the byr', () => {
                expect(passport.byr).toEqual('1937');
            });
            
            it('assigns the iyr', () => {
                expect(passport.iyr).toEqual('2017');
            });
            
            it('assigns the eyr', () => {
                expect(passport.eyr).toEqual('2020');
            });
            
            it('assigns the hgt', () => {
                expect(passport.hgt).toEqual('183cm');
            });
            
            it('assigns the hcl', () => {
                expect(passport.hcl).toEqual('#fffffd');
            });

            it('assigns the ecl', () => {
                expect(passport.ecl).toEqual('gry');
            });
            
            it('assigns the pid', () => {
                expect(passport.pid).toEqual('860033327');
            });
            
            it('assigns the cid', () => {
                expect(passport.cid).toEqual('147');
            });

        });

        describe('passport validation', () => {
            it('accepts the first example', () => {
                const passport = new Passport(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
                byr:1937 iyr:2017 cid:147 hgt:183cm`);
                expect(passport.isPassportValid()).toEqual(true);
            });

            it('rejects the second example', () => {
                const passport = new Passport(`iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
                hcl:#cfa07d byr:1929`);
                expect(passport.isPassportValid()).toEqual(false);
            });

            it('accepts the third example', () => {
                const passport = new Passport(`hcl:#ae17e1 iyr:2013
                eyr:2024
                ecl:brn pid:760753108 byr:1931
                hgt:179cm`);
                expect(passport.isPassportValid()).toEqual(true);
            });

            it('rejects the fourth example', () => {
                const passport = new Passport(`hcl:#cfa07d eyr:2025 pid:166559648
                iyr:2011 ecl:brn hgt:59in`);
                expect(passport.isPassportValid()).toEqual(false);
            });
        });

        describe('count of valid passports', () => {
            it('gets 2 as the number of valid reports for the example', () => {
                expect(countValidPassports(exampleInput)).toEqual(2);
            });
        });
    });
});