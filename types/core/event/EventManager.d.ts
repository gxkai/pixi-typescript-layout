import EventAPI, { CallbackFunc, Events } from "./EventAPI";
import { ShapeGraphics, LineGraphics, EditEnum, SelectEnum } from "../common/Graph";
import AppInterface from "../app/AppInterface";
import { EventManagerInterface } from "./EventInterface";
import Graphics = PIXI.Graphics;
declare class EventAPIManager implements EventAPI {
    protected _events: Events;
    protected _app: AppInterface;
    protected _editState: EditEnum;
    onClickGraph(callback: CallbackFunc): void;
    onMouseEnterShape(callback: CallbackFunc): void;
    onMouseLeaveShape(callback: CallbackFunc): void;
    onMouseDownShape(callback: CallbackFunc): void;
    onMouseUpShape(callback: CallbackFunc): void;
    onMouseMoveShape(callback: CallbackFunc): void;
    onMouseDownLine(callback: CallbackFunc): void;
    private _initBindShape;
    protected _bindShapeFunc(callback: CallbackFunc, target: ShapeGraphics): Function;
    protected _bindLineFunc(callback: CallbackFunc, target: LineGraphics): Function;
    protected _bindClickGraph(): void;
    protected _bindShapes(): void;
    protected _bindShapeEvents(item: ShapeGraphics): void;
}
export default class EventManager extends EventAPIManager implements EventManagerInterface {
    constructor(app: AppInterface);
    setEditState(state: EditEnum): void;
    bindAllHandler(): void;
    bindHandler(selectType: SelectEnum, target: Graphics): void;
}
export {};
