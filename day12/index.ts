import { input } from './input';

export interface Instruction {
  command: string,
  argument: number,
}

export interface Position {
  x: number,
  y: number,
}

export class Ferry {
  public instructions: Instruction[] = [];

  public heading = 'E';

  public position: Position = { x: 0, y: 0 };

  constructor (input: string) {
    this.parseInput(input);
  }

  private parseInput = (input: string): void => {
    input.split('\n').forEach((line) => {
      const command: string = line.match(/[A-Z]/)[0];
      const argument: number = parseInt(line.match(/\d+/g)[0]);
      this.instructions.push({ command, argument });
    });
  }

  public executeInstructions = (): void => {
    this.instructions.forEach((instruction) => {
      switch (instruction.command) {
        case 'N':
          this.moveNorthBy(instruction.argument);
          break;
        case 'E':
          this.moveEastBy(instruction.argument);
          break;
        case 'S':
          this.moveSouthBy(instruction.argument);
          break;
        case 'W':
          this.moveWestBy(instruction.argument);
          break;
        case 'R':
        case 'L':
          this.changeHeading(instruction.command, instruction.argument);
          break;
        case 'F':
          this.moveForwardBy(instruction.argument);
          break;
      }
    });
  }

  public manhattanDistance = (): number => Math.abs(this.position.x) + Math.abs(this.position.y);

  private moveNorthBy = (amount: number): void => {
    this.position.y += amount;
  }

  private moveEastBy = (amount: number): void => {
    this.position.x += amount;
  }

  private moveSouthBy = (amount: number): void => {
    this.position.y -= amount;
  }

  private moveWestBy = (amount: number): void => {
    this.position.x -= amount;
  }

  private moveForwardBy = (amount: number): void => {
    switch (this.heading) {
      case 'N':
        this.moveNorthBy(amount);
        break;
      case 'E':
        this.moveEastBy(amount);
        break;
      case 'S':
        this.moveSouthBy(amount);
        break;
      case 'W':
        this.moveWestBy(amount);
        break;
    }
  }

  public changeHeading = (direction: string, degrees: number): void => {
    const directionMod = direction === 'R' ? 1 : -1;

    const headingsOrientations: Map<string, number> = new Map([
      [ 'N', 0 ],
      [ 'E', 90 ],
      [ 'S', 180 ],
      [ 'W', 270 ],
    ]);

    let newDegrees = headingsOrientations.get(this.heading) + (directionMod * degrees);
    if (newDegrees >= 360) {
      newDegrees -= 360;
    } else if (newDegrees < 0) {
      newDegrees += 360;
    }

    let newHeading: string;
    headingsOrientations.forEach((value, key) => {
      if (value === newDegrees) {
        newHeading = key;
      }
    });

    this.heading = newHeading;
  }
}

const ferry = new Ferry(input);

ferry.executeInstructions();
console.log(ferry.manhattanDistance());
