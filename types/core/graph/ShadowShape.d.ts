import { ShapeContent } from "../common/Graph";
import { ShadowShapeInterface } from "./GraphInterface";
import AppInterface from "../app/AppInterface";
export default class ShadowShape implements ShadowShapeInterface {
    private _shadowShape;
    private _shadowTicker;
    private _shadowMatching;
    private _shadowMatchingCon?;
    private _app;
    constructor(app: AppInterface);
    buildShadowShape(width: number, height: number, content?: ShapeContent): void;
    destroyShadowShape(): void;
}
