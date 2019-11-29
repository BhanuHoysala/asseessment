export interface Shape {

    /**
     * Any shape implimentation should provide the definition Ex: Rectangle, Traingle, Circle
     * @param point to check whether the given point is lies within the shape or not
     */
    isInside(point): boolean;

}