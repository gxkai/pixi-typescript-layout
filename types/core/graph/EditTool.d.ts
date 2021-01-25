import { EditToolInterface, SelectHandler, UpdateHandler } from "./GraphInterface";
import { SelectEnum, Shape, ShapeContent } from "../common/Graph";
import * as PIXI from 'pixi.js';
export default class EditTool implements EditToolInterface {
    private _layer;
    private _backShape;
    private _pointLayer;
    private _lineLayer;
    private _selectHandler;
    private _updateHandler;
    private _shape;
    private _content;
    private _container;
    constructor(container: PIXI.Container);
    private _buildLayer;
    erasePoints(): Function;
    init(shape: Shape, content: ShapeContent, isDisplay?: boolean): void;
    private _drawPoint;
    private _drawLine;
    private _drawBackShape;
    private _drawEditLayer;
    addSelectHandler(handler: SelectHandler): void;
    addUpdateHandler(handler: UpdateHandler): void;
    addPoint(lineIndex: number): void;
    select(select: SelectEnum, index?: number): void;
    destroy(): void;
}
