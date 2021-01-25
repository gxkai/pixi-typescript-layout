import { ShapeContent, Graph, Shape } from "../common/Graph";
export declare enum ActionEvent {
    Add = "add",
    Delete = "delete",
    Update = "update"
}
export declare type CallbackFunc = {
    (shapeIndex: Array<number>, event: ActionEvent): void;
};
export declare type GraphOrder = {
    shapes: Array<Shape>;
    order: Array<number>;
};
export default interface ActionAPI {
    /**
     * 添加图块
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {ShapeContent} content
     * @returns void
     */
    addShape(x: number, y: number, width: number, height: number, content: ShapeContent): void;
    copyShape(shapeIndex: number): void;
    deleteShape(shapeIndex: Array<number>): void;
    /**
     * 撤销
     * @param  {CallbackFunc} callback?
     * @returns void
     */
    unDo(callback: CallbackFunc): void;
    /**
     * 重做
     * @param  {CallbackFunc} callback?
     * @returns void
     */
    reDo(callback?: CallbackFunc): void;
    /**
     * @returns GraphCache
     */
    getCurrentData(): Graph;
    /**
     * 启用编辑模式
     * @param  {GraphCache} data
     * @returns void
     */
    init(data: Graph): void;
}
