
// review 1 - keep the imports in alphabetical order which makes easier to skim over imports
import { Rectangle } from "./rectangle";
import { Point } from "./point";

/**
* This class takes a list of rectangles.
*/
// Review 2 - It is good desgin to have a Shape interface and any shape implimentation to force the certain behaviors EX: doPrint()
class RectanglePrinter {

    // Review 3 - It is good practice to mark the class properties 'private', 'public', or 'protected'
    // Review 4 - declare what type it is ( or atleast any )
    rectangles;

    // Review 5 - It can be understandable we are going to have Rectangles, so declare parameter type as Rectangle[] instead of "any"
    // review 6 - again need to mention the visiblity qualifier to the method/function as well
    // review 7 - "addRectangles()" name is miss leading, actually it is setting the value instead adding rectangles to existing array
    // review 8 - if the function is not returning anything then mark return type as "void"
    addRectangles(a: any[]) { 
        this.rectangles = a;
    }

    // review 9 - declare the return type even if it is "void"
    doPrint() {
        for (let rect of this.rectangles) {

            // review 10 - use Template Literals (Template Strings)
            console.log("Rectangle [" + rect.x1 + " " + rect.y1 + " "
                + rect.x2 + " " + rect.y2 + " " + rect.id + "]");
            this.printCorners(rect);
            // review 11 - always start a comment with space
            //print shape of rect
            let w = (rect.x2 - rect.x1) * 10;
            let h = (rect.y2 - rect.y1) * 10;
            var wl = "";
            for (var i = 0; i < w; i++) {
                wl = wl + ". ";
            }
            // review 12 - naming variables with good understandable name makes more readable (Note: w,h, wl, hl)
            // review 13 - let can be used at some of the varaibles declared as var here (Note: loops)
            var hl = ".";
            for (var i = 0; i < w - 2; i++) {
                // review 14 - short hand operators can be used here 
                hl = hl + " "; 
            }
            // review 15 - inconsistency in using semicolons at the end of statements, either use it at possible places or don't use it at all
            hl = hl + " ."
            console.log(wl);
            for (var i = 0; i < h; i++) {
                console.log(hl)
            }
            console.log(wl);
        }
    }

    // review 16 - mark the return type as "void"
    private printCorners(rect: Rectangle) {
        // review 17 - name the variables as more readable
        // review 18 - declare variables as const as they are never re-assgined 
        let lt = new Point(rect.x1, rect.y2);
        let lb = new Point(rect.x1, rect.y1);
        let rt = new Point(rect.x2, rect.y2);
        let rb = new Point(rect.x2, rect.y1);
        console.log(`Corners: ${this.ts(lt)} ${this.ts(rt)} ${this.ts(lb)} ${this.ts(rb)}`)
    }

    // review 19 - mark the return type as "string"
    private ts(p: Point) {
        return `(${p.x} ${p.y})`
    }
}