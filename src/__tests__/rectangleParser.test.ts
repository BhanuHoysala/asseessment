import { Point } from "../model/Point";
import { Rectangle } from "../model/Rectangle";
import { buildReactangle } from "../parsers/rectangleParser";

describe('Examining the Rectangle parser function', () => {
    it('Parse rectangle for input [1 1 2 2 first rect]', () => {
        expect(new Rectangle("first rect", new Point(1, 1), new Point(2, 2)))
            .toEqual(buildReactangle("[1 1 2 2 first rect]"));
    });
});