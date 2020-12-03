import { input } from "./input";

export interface Slope {
    right: number,
    down: number,
}

interface Position {
    x: number,
    y: number,
}

export const calculateTreesHit = (input: string, slope: Slope): number => {
    let treesHit = 0;
    const currentPosition: Position = {
        x: 0,
        y: 0,
    }

    const mapHeight = calculateMapHeight(input);
    const mapWidth = calculateMapWidth(input);
    const map: string[][] = createMap(input);

    while (currentPosition.y < mapHeight) {
        if (map[currentPosition.y][currentPosition.x] === '#') {
            treesHit++;
        }
        currentPosition.x = currentPosition.x + slope.right;
        if (currentPosition.x >= mapWidth) {
            currentPosition.x = currentPosition.x - mapWidth;
        }
        currentPosition.y = currentPosition.y + slope.down;
    }

    return treesHit;
}


export const calculateMapHeight = (input: string): number => {
    return input.split(/\r\n|\r|\n/).length;
};

export const calculateMapWidth = (input: string): number => {
    return input.split(/\r\n|\r|\n/)[0].length;
}

export const createMap = (input: string): string[][] => {
    const map: string[][] = [];
    const lines: string[] = input.split(/\r\n|\r|\n/);
    
    lines.forEach((line) => {
        map.push(Array.from(line));
    });
    return map;
}

console.log(calculateTreesHit(input, { right: 1, down: 1}) *
    calculateTreesHit(input, { right: 3, down: 1}) * 
    calculateTreesHit(input, { right: 5, down: 1}) *
    calculateTreesHit(input, { right: 7, down: 1}) *
    calculateTreesHit(input, { right: 1, down: 2}));