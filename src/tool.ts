/**
 * Driver program
 */

import { Point } from './model/Point';
import { DELAY } from './constants';
import { Rectangle } from './model/Rectangle';
import { buildPoint } from './parsers/pointParser';
import { buildReactangle } from './parsers/rectangleParser';
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

        const reactangle = buildReactangle(line);
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
    const rectanglesHasPoints = new Set();
    let firstPointFound: boolean = true;
    for (const point of points) {
        for (const rectangle of rectangles) {

            // TODO - need to work on this delay
            const timer = ms => new Promise(res => setTimeout(res, ms));
            timer(1000).then();

            if (rectangle.isInside(point)) { // perform any log operation IFF the a point inside the Rectangle
                for (let i = 0; i < DELAY; i++); // TODO needed to fix this loop
                if (firstPointFound) {      // At the first entered rectangle not able to make the comparision with previous, Hence using a variable
                    console.log(`Entered to Rectangle - "${rectangle.id}"`);
                    firstPointFound = false;
                }
                console.log(`point (${point.x} ${point.y}) found in Rectangle - "${rectangle.id}"`);
                rectanglesHasPoints.add(rectangle.id); // To keep track of the overlapping Rectangles
                if (previousRectangleId !== rectangle.id && rectanglesHasPoints.has(rectangle.id)) {

                    console.log(`Rectangle - "${previousRectangleId}" has exited`);
                    console.log(`Entered to Rectangle - "${rectangle.id}"`);
                }
                if (previousPoint.x === point.x && previousPoint.y === point.y
                    && previousRectangleId !== rectangle.id) { // If the Rectangles are overlapped
                    console.log(`Rectangle - "${previousRectangleId}" and Rectangle - "${rectangle.id}" has overlapped at point (${point.x} ${point.y})`);
                }

                previousRectangleId = rectangle.id;
                previousPoint = point;
            }
        }
    }

    console.log(`Rectangle - "${previousRectangleId}" has exited`);
}

