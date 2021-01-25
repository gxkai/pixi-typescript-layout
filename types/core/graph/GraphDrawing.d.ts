import { ShapeContent, Shape, ShapeGraphics, GraphCache } from "../common/Graph";
import AppInterface from "../app/AppInterface";
import { ShadowShapeInterface } from "./GraphInterface";
import * as PIXI from 'pixi.js';
export default class GraphDrawing {
    protected _shapeLayer: PIXI.Container;
    protected _graphCache: GraphCache;
    protected _app: AppInterface;
    protected _shadowShape: ShadowShapeInterface;
    graphContainer: PIXI.Container;
    mouseHoverShapeIndex: number;
    get graph(): GraphCache;
    set graph(v: GraphCache);
    constructor(app: AppInterface);
    buildShapes(shape: Shape, index: number, content: ShapeContent): ShapeGraphics;
    deleteShapes(name: string): void;
    hideShapes(shapeIndex: number): void;
    showShapes(shapeIndex: number): void;
    updateShapes(shape: Shape, shapeIndex: number, content?: ShapeContent, keepIndex?: boolean): void;
    buildShadowShapes(shape: Shape, content?: ShapeContent): PIXI.Graphics;
    private _addSelectHandler;
}
