import { calculateNumberOfValidPasswords, passwordMatchesPolicy, passwordMatchesPolicyPart2, PolicyAndPassword } from './';

describe('password policies', () => {
    beforeEach(() => {
        expect.hasAssertions();
    });
    describe('part 1', () => {
        describe('given a list item consisting of the policy and password', () => {
            let policyAndPassword: PolicyAndPassword;
            beforeAll(() => {
                policyAndPassword = new PolicyAndPassword('1-3 a: abcde');
            });
            describe('parsing', () => {
                it('knows the lowest number of times a letter can appear given a list item', () => {
                    expect(policyAndPassword.lowestNumberOfTimesForLetter).toEqual(1);
                });
                it('knows the highest number of times a letter can appear given a list item', () => {
                    expect(policyAndPassword.highestNumberOfTimesForLetter).toEqual(3);
                });
                it('knows the given letter given a list item', () => {
                    expect(policyAndPassword.policyLetter).toEqual('a');
                });
                it('knows the given password', () => {
                    expect(policyAndPassword.password).toEqual('abcde');
                });
            });
            describe('calculation', () => {
                it('knows if the password matches the policy', () => {
                    expect(passwordMatchesPolicy(policyAndPassword)).toEqual(true);
                });
            });
        });
        describe('given a list consisting of multiple password policies', () => {
            it('knows how many are valid', () => {
                expect(calculateNumberOfValidPasswords(
                    `1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc`,
                    passwordMatchesPolicy,
                )).toEqual(2);
            });
        });
    });
    describe('part 2', () => {
        it('knows that the first case is valid', () => {
            const policyAndPassword = new PolicyAndPassword('1-3 a: abcde');
            expect(passwordMatchesPolicyPart2(policyAndPassword)).toEqual(true);
        });
        it('knows that the second case is invalid', () => {
            const policyAndPassword = new PolicyAndPassword('1-3 b: cdefg');
            expect(passwordMatchesPolicyPart2(policyAndPassword)).toEqual(false);
        });
        it('knows that the third case is invalid', () => {
            const policyAndPassword = new PolicyAndPassword('2-9 c: ccccccccc');
            expect(passwordMatchesPolicyPart2(policyAndPassword)).toEqual(false);
        });
    });
});