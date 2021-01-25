import OperationAPI from "./OperationAPI";
import AppInterface from "../app/AppInterface";
import { ShapeContent } from "../common/Graph";
import { RegionDeleteCallBack } from "../graph/GraphInterface";
export default class OperationManager implements OperationAPI {
    private _app;
    private readonly _graphCon;
    constructor(app: AppInterface);
    zoomIn(level?: number): void;
    zoomOut(level?: number): void;
    justify(): void;
    setEraserSize(size: number): void;
    enableEraser(isEnabled: boolean): void;
    enableFreeDrawing(isEnabled: boolean): void;
    enableEdit(isEnabled: boolean): void;
    setShapeContent(index: number, content?: ShapeContent): void;
    addShadowShape(width: number, height: number, content?: ShapeContent): void;
    deleteShadowShape(): void;
    addPoint(lineIndex: number): void;
    selectNone(): void;
    enableRegionDelete(isEnabled: boolean, callBack?: RegionDeleteCallBack): void;
}
