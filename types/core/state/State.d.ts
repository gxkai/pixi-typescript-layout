import { StateInterface } from "./StateInterface";
import { GraphManagerInterface, RegionDeleteCallBack } from "../graph/GraphInterface";
import { EventManagerInterface } from "../event/EventInterface";
import { SelectEnum } from "../common/Graph";
export declare abstract class SelectSuperState implements StateInterface {
    protected _index: Array<number>;
    protected _select: SelectEnum;
    isChangingSelect: boolean;
    constructor(index: Array<number>, select: SelectEnum);
    protected processLayer(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
    processGraph(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
}
export declare class NormalSelectState extends SelectSuperState {
    protected processLayer(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
}
export declare class EditingSelectState extends SelectSuperState {
    protected processLayer(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
}
export declare class EditingEraserState extends SelectSuperState {
    protected processLayer(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
}
export declare class EditingRegionDeleteState extends SelectSuperState {
    protected _enable: boolean;
    protected _callBack?: RegionDeleteCallBack;
    constructor(index: Array<number>, select: SelectEnum, enable: boolean, callBack?: RegionDeleteCallBack);
    processGraph(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
}
export declare class NormalNoneState extends SelectSuperState {
    processGraph(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
}
export declare class EditingNoneState extends SelectSuperState {
    processGraph(graphManager: GraphManagerInterface, eventManager: EventManagerInterface): void;
}
