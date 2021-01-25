import { Shape, ShapeContent, Point, LineGraphics, PointGraphics, ShapeGraphics } from "../common/Graph";
export declare function drawShape(graphics: ShapeGraphics, shape: Shape, textScale: number, content?: ShapeContent): ShapeGraphics;
export declare function buildLine(line: LineGraphics, start: Point, end: Point): void;
export declare function buildPoint(graphics: PointGraphics, point: Point): void;
