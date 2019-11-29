import { Point } from "../model/Point";
import { buildPoint } from "../parsers/pointParser";

describe('Examining the Point parser function', () => {
it('Parse point for input (1.2 1.2)', () => {
    expect(new Point(1.2, 1.2)).toEqual(buildPoint("(1.2 1.2)"));
  });
});