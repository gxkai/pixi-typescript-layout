import * as PIXI from 'pixi.js';
export declare type Point = [number, number];
export declare type Shape = Array<Point>;
export declare type Graph = {
    shapes: Array<Shape>;
};
export declare enum LineStyle {
    Dashed = "dashed",
    Solid = "solid"
}
export declare type ShapeContent = {
    backgroundAlpha?: number;
    backgroundColor: number;
    backgroundImage?: string;
    border: {
        lineWidth: number;
        color: number;
        lineStyle: LineStyle;
    };
    font: {
        fontSize: number;
        fill: Array<number>;
    };
    content: string;
    hasMark?: boolean;
    alpha?: number;
    interactive?: boolean;
};
export interface IndexableContent {
    [index: number]: ShapeContent;
}
export declare type Background = {
    url: string;
    alpha?: number;
};
export interface GraphCache {
    background: Background;
    shapesContent: IndexableContent;
}
export declare class ShapeGraphics extends PIXI.Graphics {
    shapeIndex: number;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}
export declare class LineGraphics extends PIXI.Graphics {
    lineIndex: number;
    startPoint: Point;
    endPoint: Point;
    isHighlight: boolean;
}
export declare class PointGraphics extends PIXI.Graphics {
    pointIndex?: number;
    point?: Point;
    isHighlight?: boolean;
}
export declare enum EditEnum {
    Normal = "Normal",
    Editing = "Editing"
}
export declare enum SelectEnum {
    None = "None",
    Shape = "Shape",
    Line = "Line",
    Point = "Point"
}
