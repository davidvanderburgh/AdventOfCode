import { input } from './input';

export type SeatingGrid = string[][];

export class SeatingSystem {
  public seatingGrids: SeatingGrid[] = [];

  constructor (input: string) {
    this.seatingGrids.push(this.createGridFromInput(input));
  }

  public simulateFinalOccupiedSeats = (): number => {
    while (JSON.stringify(this.seatingGrids[this.seatingGrids.length - 2]) !==
      JSON.stringify(this.seatingGrids[this.seatingGrids.length - 1])) {
      this.seatingGrids.push(this.createNewGridFromGrid(
        this.seatingGrids[this.seatingGrids.length - 1],
      ));
    }

    return this.countOccupiedSeats(this.seatingGrids[this.seatingGrids.length - 1]);
  };

  private countOccupiedSeats = (seatingGrid: SeatingGrid): number => {
    let occupiedSeatCount = 0;
    for (let row = 0; row < seatingGrid.length; row++) {
      for (let column = 0; column < seatingGrid[0].length; column++) {
        if (seatingGrid[row][column] === '#') {
          occupiedSeatCount++;
        }
      }
    }

    return occupiedSeatCount;
  };

  private createNewGridFromGrid = (seatingGrid: SeatingGrid): SeatingGrid => {
    const newSeatingGrid: SeatingGrid = [];

    for (let row = 0; row < seatingGrid.length; row++) {
      const newSeatingGridRow: string[] = [];
      for (let column = 0; column < seatingGrid[0].length; column++) {
        const newSeatValue = this.getNewSeatValue(seatingGrid, row, column);
        newSeatingGridRow.push(newSeatValue);
      }
      newSeatingGrid.push(newSeatingGridRow);
    }
    return newSeatingGrid;
  };

  private getNewSeatValue = (
    seatingGrid: SeatingGrid,
    row: number,
    column: number,
  ): string => {
    let seatValue: string = seatingGrid[row][column];

    let adjacentOccupiedSeats = 0;

    if (this.seatIsOccupied(seatingGrid, row - 1, column - 1)) {
      adjacentOccupiedSeats++;
    }

    if (this.seatIsOccupied(seatingGrid, row - 1, column)) {
      adjacentOccupiedSeats++;
    }

    if (this.seatIsOccupied(seatingGrid, row - 1, column + 1)) {
      adjacentOccupiedSeats++;
    }

    if (this.seatIsOccupied(seatingGrid, row, column - 1)) {
      adjacentOccupiedSeats++;
    }

    if (this.seatIsOccupied(seatingGrid, row, column + 1)) {
      adjacentOccupiedSeats++;
    }

    if (this.seatIsOccupied(seatingGrid, row + 1, column - 1)) {
      adjacentOccupiedSeats++;
    }

    if (this.seatIsOccupied(seatingGrid, row + 1, column)) {
      adjacentOccupiedSeats++;
    }

    if (this.seatIsOccupied(seatingGrid, row + 1, column + 1)) {
      adjacentOccupiedSeats++;
    }

    if (seatValue === 'L' && adjacentOccupiedSeats === 0) {
      seatValue = '#';
    } else if (seatValue === '#' && adjacentOccupiedSeats >= 4) {
      seatValue = 'L';
    }

    return seatValue;
  }

  private seatIsOccupied = (
    seatingGrid: SeatingGrid,
    row: number,
    column: number,
  ): boolean => {
    let occupied = false;
    try {
      occupied = seatingGrid[row][column] === '#';
    } catch {
      occupied = false;
    }
    return occupied;
  }

  private createGridFromInput = (input: string): SeatingGrid => {
    const grid: SeatingGrid = [];
    input.split('\n').forEach((line, row) => {
      const elements: string[] = [];
      for (let column = 0; column < line.length; column++) {
        elements.push(line[column]);
      }
      grid[row] = elements;
    });
    return grid;
  };
}

const seatingSystem = new SeatingSystem(input);
console.log(seatingSystem.simulateFinalOccupiedSeats());
