import { StateManagerInterface } from "./StateInterface";
import AppInterface from "../app/AppInterface";
import { SelectEnum } from '../common/Graph';
import { RegionDeleteCallBack } from '../graph/GraphInterface';
export default class StateManager implements StateManagerInterface {
    private _app;
    private _editEnum;
    private _isEnableFreeDrawing;
    private _selectEnum;
    private _isEnableEraser;
    private _selectIndex;
    private _currentState;
    private _isEnableRegionDelete;
    constructor(app: AppInterface);
    isEnableFreeDrawing(): boolean;
    private _activeState;
    enableEdit(isEnabled: boolean): void;
    enableFreeDrawing(isEnabled: boolean): void;
    enableEraser(isEnabled: boolean): void;
    select(state: SelectEnum, index: Array<number>): void;
    enableRegionDelete(isEnabled: boolean, callBack?: RegionDeleteCallBack): void;
}
