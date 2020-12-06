import { input } from './input';

interface Group {
  people: Person[],
}

interface Person {
  answers: string[],
}

export class Customs {
  public groups: Group[] = [];

  constructor (private input: string) {
    this.parseInput();
  }

  private parseInput (): void {
    const inputGroups: string[] = this.input.split('\n\n');

    inputGroups.forEach((answerGroup) => {
      const group: Group = { people: [] };
      answerGroup.split('\n').forEach((personAnswers) => {
        const answers: string[] = [];
        for (let i = 0; i < personAnswers.length; i++) {
          answers.push(personAnswers[i]);
        }
        const person: Person = { answers };
        group.people.push(person);
      });
      this.groups.push(group);
    });
  }

  public countOfUniqueAnswers = (): number => {
    let count = 0;
    this.groups.forEach((group) => {
      count += getUniqueAnswers(group).length;
    });
    return count;
  };

  public countOfCommonAnswers = (): number => {
    let count = 0;
    this.groups.forEach((group) => {
      count += getCommonAnswers(group).length;
    });
    return count;
  };
}

export const getUniqueAnswers = (group: Group): string[] => {
  const uniqueAnswers: string[] = [];
  group.people.forEach((person) => {
    person.answers.forEach((answer) => {
      if (uniqueAnswers.indexOf(answer) === -1) {
        uniqueAnswers.push(answer);
      }
    });
  });

  return uniqueAnswers;
};

export const getCommonAnswers = (group: Group): string[] => {
  const commonAnswersRecord: Record<string, number> = {} as Record<string, number>;

  group.people.forEach((person) => {
    person.answers.forEach((answer) => {
      if (commonAnswersRecord[answer]) {
        commonAnswersRecord[answer]++;
      } else {
        commonAnswersRecord[answer] = 1;
      }
    });
  });

  const commonAnswers: string[] = [];
  Object.keys(commonAnswersRecord).forEach((key) => {
    if (commonAnswersRecord[key] === group.people.length) {
      commonAnswers.push(key);
    }
  });

  return commonAnswers;
};

const customs = new Customs(input);

console.log(customs.countOfUniqueAnswers());
console.log(customs.countOfCommonAnswers());