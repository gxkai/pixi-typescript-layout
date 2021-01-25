import { ActionInterface } from "./ActionInterface";
import { ShapeContent, Shape, Graph } from "../common/Graph";
import AppInterface from "../app/AppInterface";
import { ActionEvent } from "./ActionAPI";
export declare class CreateShapeAction implements ActionInterface {
    private readonly _pointArr;
    private readonly _content;
    private _app;
    shapeIndex: Array<number>;
    actionEvent: ActionEvent;
    constructor(pointArr: Shape, content: ShapeContent, app: AppInterface);
    do(data: Graph): Graph;
    unDo(data: Graph): Graph;
}
export declare class DeleteShapeAction implements ActionInterface {
    private _pointArr;
    private _app;
    shapeIndex: Array<number>;
    actionEvent: ActionEvent;
    constructor(shapeIndex: Array<number>, app: AppInterface);
    do(data: Graph): Graph;
    unDo(data: Graph): Graph;
}
export declare class CopyShapeAction implements ActionInterface {
    private readonly _copyShapeIndex;
    private _app;
    shapeIndex: Array<number>;
    actionEvent: ActionEvent;
    constructor(shapeIndex: number, app: AppInterface);
    do(data: Graph): Graph;
    unDo(data: Graph): Graph;
}
export declare class UpdateShapeAction implements ActionInterface {
    private readonly _newShape;
    private _app;
    private _oldShape;
    shapeIndex: Array<number>;
    actionEvent: ActionEvent;
    constructor(shape: Shape, shapeIndex: number, app: AppInterface);
    do(data: Graph): Graph;
    unDo(data: Graph): Graph;
}
