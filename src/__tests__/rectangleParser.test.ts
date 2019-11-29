import { Point } from "../model/Point";
import { Rectangle } from "../model/Rectangle";
import { buildRectangle } from "../parsers/rectangleParser";

// TEST - Examining the Rectangle parser function
describe('Examining the Rectangle parser function', () => {
    it('Parse rectangle for input [1 1 2 2 first rect]', () => {
        expect(new Rectangle("first rect", new Point(1, 1), new Point(2, 2)))
            .toEqual(buildRectangle("[1 1 2 2 first rect]"));
    });
});


// TEST - scenario when the point lays within the rectangle
const rectangle: Rectangle = new Rectangle("Test Rectangle", new Point(1, 1), new Point(2, 2));
const inPoint: Point = new Point(1.2, 1.2);
describe('Examining the isExist() method of rectangle class', () => {
    it('check point (1.2 1.2) lays within rectangle[1 1 2 2]', () => {
        expect(true)
            .toEqual(rectangle.isInside(inPoint));
    });
});


// TEST - scenario when the point lays outside the rectangle
const outPoint: Point = new Point(3, 3);
describe('Examining the isExist() method of rectangle class', () => {
    it('check point (3 3) lays within rectangle[1 1 2 2]', () => {
        expect(false)
            .toEqual(rectangle.isInside(outPoint));
    });
});