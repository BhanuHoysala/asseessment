/**
 * Driver program - A tool of processor for Recatangle and point (geofence) processing
 */

import { Point } from './model/Point';
import { Rectangle } from './model/Rectangle';
import { buildPoint } from './parsers/pointParser';
import { buildRectangle } from './parsers/rectangleParser';
import { getFileReader } from './util/fileUtils';


/* commandLineArgs[0] : will hold rectangles file name
*  commandLineArgs[1] : will hold points file name  */
const commandLineArgs: string[] = process.argv.slice(2); // Reading the command line arguments

/**
 * parsing and creating Rectangles
 */
const rectangleFileReader = getFileReader(commandLineArgs[0]);
const rectangles: Rectangle[] = new Array();
rectangleFileReader.on('line', (line: string): void => {

    if ('#' !== line.charAt(0)) { // Skipping the commented lines

        const reactangle = buildRectangle(line);
        rectangles.push(reactangle);
    }
}).on('close', (): void => {
    rectangleFileReader.close();
    processPointsFile();
});


/**
 * parsing and creating Points
 */
function processPointsFile(): void {

    const pointsFileReader = getFileReader(commandLineArgs[1]);
    const points: Point[] = new Array();
    pointsFileReader.on('line', (line: string): void => {

        if ('#' !== line.charAt(0)) {

            const point = buildPoint(line);
            points.push(point);
        }
    }).on('close', (): void => {
        pointsFileReader.close();
        processPoints(points);
    });
}

/**
 * processing each points check they lies inside the Rectangles or not
 * @param points 
 */
function processPoints(points: Point[]): void {

    let previousRectangleId: string = rectangles[0].id;
    let previousPoint: Point = points[0];
    let firstPointFound: boolean = true;
    for (const [j, point] of points.entries()) {
        setTimeout(() => { // To iterate over all points at a rate of one point per second 
            for (const rectangle of rectangles) {

                if (rectangle.isInside(point)) { // perform any log operation IFF the a point inside the Rectangle

                    if (firstPointFound) {      // At the first entered rectangle not able to make the comparision with previous, Hence using a flag
                        console.log(`\nEntered to Rectangle - "${rectangle.id}"`);
                        firstPointFound = false;
                    }
                    console.log(`\npoint (${point.x} ${point.y}) found in Rectangle - "${rectangle.id}"`);
                    if (previousRectangleId !== rectangle.id) {

                        console.log(`\nRectangle - "${previousRectangleId}" has exited`);
                        console.log(`\nEntered to Rectangle - "${rectangle.id}"`);
                    }
                    if (previousPoint.x === point.x && previousPoint.y === point.y
                        && previousRectangleId !== rectangle.id) { // If the Rectangles are overlapped
                        console.log(`\nRectangle - "${previousRectangleId}" and Rectangle - "${rectangle.id}" has overlapped at point (${point.x} ${point.y})`);
                    }

                    previousRectangleId = rectangle.id;
                    previousPoint = point;
                }

            }
            if ((points.length - 1) === j) {
                console.log(`\nRectangle - "${previousRectangleId}" has exited`)
            }
        }, 1000 * j);
    }

}

