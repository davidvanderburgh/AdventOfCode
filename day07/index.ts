import { input } from './input';

export interface Node {
  name: string,
  qty: number,
  children: Node[],
}

export const createNodes = (input: string): Map<string, Node> => {
  let bagMap: Map<string, Node> = createParents(input);
  bagMap = addChildren(input, bagMap);
  return bagMap;
};

export const countBagsEventuallyContaining = (bagName: string, input: string): number => {
  const bagMap = createNodes(input);
  let count = 0;
  bagMap.forEach((node) => {
    if (hasDescendent(node, bagName)) {
      count++;
    }
  });
  return count - 1;
};

const createParents = (input: string): Map<string, Node> => {
  const bagMap: Map<string, Node> = new Map();
  input.split('\n').forEach((line) => {
    const parentName = line.split(/ bags contain /)[0];
    bagMap.set(parentName, { name: parentName, qty: 1, children: [] });
  });
  return bagMap;
};

const addChildren = (input: string, bagMap: Map<string, Node>): Map<string, Node> => {
  input.split('\n').forEach((line) => {
    const parentName = line.split(/ bags contain /)[0];
    const childrenPart = line.split(/ bags contain /)[1];
    const childrenNodes: Node[] = getChildrenNodes(childrenPart, bagMap);
    childrenNodes.forEach((childNode) => {
      bagMap.get(parentName).children.push(childNode);
    });
  });
  return bagMap;
};

export const hasDescendent = (node: Node, nameOfChild: string): boolean => {
  if (node.name === nameOfChild) {
    return true;
  } else if (node.children) {
    let result = false;
    for (let i = 0; result === false && i < node.children.length; i++) {
      result = hasDescendent(node.children[i], nameOfChild);
    }
    return result;
  }
  return false;
};

const getChildrenNodes = (
  childrenPart: string,
  bagMap: Map<string, Node>,
): Node[] => {
  const childrenNodes: Set<Node> = new Set();
  const childrenStrings: string[] = childrenPart.replace(/( bags?)|\./g, '').split(',');
  childrenStrings.forEach((childString) => {
    if (childString.match(/no other/) === null) {
      const qty: number = parseInt(childString.match(/([0-9]+)/)[0]);
      const name: string = childString.match(/\b[a-z]+\b( |)/g).join('');
      childrenNodes.add({ ...bagMap.get(name), qty });
    }
  });
  return Array.from(childrenNodes);
};

export const countAllChildren = (
  bagName: string,
  bagMap: Map<string, Node>,
): number => {
  let count = 0;
  const bag = bagMap.get(bagName);
  bag.children.forEach((child) => {
    for (let i = 0; i < child.qty; i++) {
      count += countAllChildren(child.name, bagMap);
      count++;
    }
  });
  return count;
};

console.log(countBagsEventuallyContaining('shiny gold', input));

console.log(countAllChildren('shiny gold', createNodes(input)));
