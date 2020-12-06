import { Customs, getCommonAnswers, getUniqueAnswers } from './';
import { exampleInput } from './input';

describe('custom customs', () => {
  const exampleCustoms = new Customs(exampleInput);

  beforeEach(() => {
    expect.hasAssertions();
  });

  describe('part 1', () => {
    it('splits the input into groups', () => {
      expect(exampleCustoms.groups.length).toEqual(5);
    });

    it('gets 1 persons answers for the first example group', () => {
      expect(exampleCustoms.groups[0].people.length).toEqual(1);
    });

    it('gets 3 personAnswers for the second example group', () => {
      expect(exampleCustoms.groups[1].people.length).toEqual(3);
    });

    it('gets 3 unique answers for the first example', () => {
      expect(getUniqueAnswers(exampleCustoms.groups[0]).length).toEqual(3);
    });

    it('gets 3 unique answers for the second group', () => {
      expect(getUniqueAnswers(exampleCustoms.groups[1]).length).toEqual(3);
    });

    it('gets 3 unique answers for the third group', () => {
      expect(getUniqueAnswers(exampleCustoms.groups[2]).length).toEqual(3);
    });

    it('gets 1 unique answer for the fourth group', () => {
      expect(getUniqueAnswers(exampleCustoms.groups[3]).length).toEqual(1);
    });

    it('gets 1 unique answer for the fifth group', () => {
      expect(getUniqueAnswers(exampleCustoms.groups[4]).length).toEqual(1);
    });

    it('counts 11 correct answers for the example input', () => {
      expect(exampleCustoms.countOfUniqueAnswers()).toEqual(11);
    });
  });

  describe('part 2', () => {
    it('counts 3 common answers for the first group', () => {
      expect(getCommonAnswers(exampleCustoms.groups[0]).length).toEqual(3);
    });

    it('counts 0 common answers for the second group', () => {
      expect(getCommonAnswers(exampleCustoms.groups[1]).length).toEqual(0);
    });
    it('counts 1 common answers for the third group', () => {
      expect(getCommonAnswers(exampleCustoms.groups[2]).length).toEqual(1);
    });
    it('counts 1 common answers for the fourth group', () => {
      expect(getCommonAnswers(exampleCustoms.groups[3]).length).toEqual(1);
    });
    it('counts 1 common answers for the fifth group', () => {
      expect(getCommonAnswers(exampleCustoms.groups[4]).length).toEqual(1);
    });
  });
});
