import { Point } from "./Point";
import { Shape } from "./Shape";

/**
 * Rectangle class
 * Objects of Rectangle class are immutable 
 */
export class Rectangle implements Shape {

    constructor(readonly id: string,
        readonly point1: Point, readonly point2: Point) {
    }

    /**
     * Overriding the isInside method
     * 
     * @param point 
     */
    public isInside(point: Point): boolean {

        /*      A point lies within the rectangle or not if and only if its x coordinate is between the x coordinate of the specified right lower 
                and left upper coordinate of the rectangle and the y coordinate between the y coordinate of the specified lower coordinate -right 
                and top-left coordinates. */
        if (point.x > this.point1.x && point.x < this.point2.x &&
            point.y > this.point1.y && point.y < this.point2.y) {
            return true;
        }

        return false;
    }
}
