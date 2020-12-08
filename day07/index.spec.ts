import { countAllChildren, countBagsEventuallyContaining, createNodes, hasDescendent } from './';
import { exampleInput } from './input';

describe('handy haversacks', () => {
  const bagMap = createNodes(exampleInput);
  beforeEach(() => {
    expect.hasAssertions();
  });

  describe('part 1', () => {
    it('creates a map containing all of the parent rules', () => {
      expect(bagMap.has('light red')).toEqual(true);
      expect(bagMap.has('dark orange')).toEqual(true);
      expect(bagMap.has('bright white')).toEqual(true);
      expect(bagMap.has('muted yellow')).toEqual(true);
      expect(bagMap.has('shiny gold')).toEqual(true);
      expect(bagMap.has('dark olive')).toEqual(true);
      expect(bagMap.has('vibrant plum')).toEqual(true);
      expect(bagMap.has('faded blue')).toEqual(true);
      expect(bagMap.has('dotted black')).toEqual(true);
    });

    it('has the direct children nodes for light red', () => {
      expect(hasDescendent(bagMap.get('light red'), 'bright white')).toEqual(true);
      expect(hasDescendent(bagMap.get('light red'), 'muted yellow')).toEqual(true);
    });

    it('has the eventual children nodes for light red', () => {
      expect(hasDescendent(bagMap.get('light red'), 'shiny gold')).toEqual(true);
      expect(hasDescendent(bagMap.get('light red'), 'faded blue')).toEqual(true);
    });

    it('claims that shiny gold is a descendent of itself', () => {
      expect(hasDescendent(bagMap.get('shiny gold'), 'shiny gold')).toEqual(true);
    });

    it('knows that faded blue contains no children', () => {
      expect(bagMap.get('faded blue').children).toEqual([]);
    });

    it('knows that 4 bags can eventually contain a shiny gold bag', () => {
      expect(countBagsEventuallyContaining('shiny gold', exampleInput)).toEqual(4);
    });
  });

  describe('part 2', () => {
    it('knows that a vibrant plum bag can contain 11 other bags', () => {
      expect(countAllChildren('vibrant plum', bagMap)).toEqual(11);
    });

    it('knows that a dark olive bag can contain 7 other bags', () => {
      expect(countAllChildren('dark olive', bagMap)).toEqual(7);
    });

    it('knows that a shiny gold bag can contain up to 32 bags', () => {
      expect(countAllChildren('shiny gold', bagMap)).toEqual(32);
    });

    it('knows that a faded blue bag can contain no bags', () => {
      expect(countAllChildren('faded blue', bagMap)).toEqual(0);
    });
  });
});
