import { Point } from "../model/Point";

/**
 * Builds the Point instance by parsing the rectangle data given in text fromat
 * @param line 
 */
export function buildPoint(line: string): Point {

    line = line.replace(/[()]/g, ''); // removing parenthsis from points values
    const xyCordinates: string[] = line.split(' ');  // splitting the line data which is seperated by white space
    const point = new Point(+xyCordinates[0], +xyCordinates[1]);
    return point;
}