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
     * @param point 
     */
    public isInside(point : Point) : boolean{
        
        if(point.x > this.point1.x && point.x < this.point2.x &&
            point.y > this.point1.y && point.y < this.point2.y) {
                return true; 
            }

        return false;
    }
}
