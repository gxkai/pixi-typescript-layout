import ActionAPI, { CallbackFunc, GraphOrder } from "./ActionAPI";
import { ActionInterface, ActionManagerInterface } from "./ActionInterface";
import { Graph, ShapeContent, Shape } from "../common/Graph";
import AppInterface from "../app/AppInterface";
declare class Manager {
    protected _currentData: Graph;
    protected _actionIndex: number;
    protected _actionList: Array<ActionInterface>;
    protected _app: AppInterface;
    constructor(app: AppInterface);
    protected addAction(action: ActionInterface): void;
    unDo(callback?: CallbackFunc): void;
    reDo(callback?: CallbackFunc): void;
    emptyDoingList(): void;
}
export default class ActionManager extends Manager implements ActionAPI, ActionManagerInterface {
    init(data: Graph): void;
    getCurrentData(): GraphOrder;
    addShape(x: number, y: number, width: number, height: number, content: ShapeContent): void;
    copyShape(shapeIndex: number): void;
    deleteShape(shapeIndex: Array<number>): void;
    updateShape(shape: Shape, shapeIndex: number): void;
    getCurrentShape(shapeIndex: number): Shape;
}
export {};
