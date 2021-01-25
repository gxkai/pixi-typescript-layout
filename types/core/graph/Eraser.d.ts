import { EraserInterface } from "./GraphInterface";
import * as PIXI from 'pixi.js';
export default class Eraser implements EraserInterface {
    private _circleCursor;
    private _cursorTicker;
    private _interaction;
    private _extraLayer;
    private _shapeLayer;
    private _eraserSize;
    private _deletePointArr;
    private _isErase;
    private readonly _callback;
    private _state;
    private _graphContainer;
    constructor(interaction: PIXI.InteractionManager, extraLayer: PIXI.Container, shapeLayer: PIXI.Container, callback: Function, state: PIXI.Container, graphContainer: PIXI.Container);
    private buildCircle;
    enable(): void;
    disable(): void;
    setSize(size: number): void;
    private _changeInteractive;
    private _findDeletePoints;
}
