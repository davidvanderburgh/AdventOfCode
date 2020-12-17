import { input } from './input';

export class BusTimes {
  public arrivalTime: number;

  public buses: number[] = [];

  public earliestBus: number;

  public waitTime: number;

  constructor (input: string) {
    this.parseInput(input);
    this.earliestBus = this.findEarliestBusAndWaitTime().bus;
    this.waitTime = this.findEarliestBusAndWaitTime().waitTime;
  }

  private parseInput = (input: string): void => {
    const lines = input.split('\n');
    this.arrivalTime = parseInt(lines[0]);

    lines[1].split(',').forEach((entry) => {
      if (entry !== 'x') {
        this.buses.push(parseInt(entry));
      }
    });
  }

  private findEarliestBusAndWaitTime = (): { bus: number, waitTime: number } => {
    let earliestBus = -1;
    let time = this.arrivalTime;

    while (earliestBus === -1) {
      time++;
      this.buses.forEach((bus) => {
        if (time % bus === 0) {
          earliestBus = bus;
        }
      });
    }
    return { bus: earliestBus, waitTime: time - this.arrivalTime };
  }

  public solution = (): number => this.earliestBus * this.waitTime;
}

const busTimes = new BusTimes(input);
console.log(busTimes.solution());