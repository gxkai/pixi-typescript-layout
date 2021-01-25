import * as PIXI from "pixi.js";
import AppInterface from './AppInterface';
import AppAPI from "./AppAPI";
import ActionAPI from "../action/ActionAPI";
import OperationAPI from "../operation/OperationAPI";
import EventAPI from "../event/EventAPI";
import { StateManagerInterface } from '../state/StateInterface';
import { ActionManagerInterface } from "../action/ActionInterface";
import { GraphManagerInterface, setGraphCallback } from "../graph/GraphInterface";
import { EventManagerInterface } from "../event/EventInterface";
import { Graph, GraphCache } from "../common/Graph";
interface ActionCombine extends ActionAPI, ActionManagerInterface {
}
interface EventCombine extends EventAPI, EventManagerInterface {
}
export default class App implements AppInterface, AppAPI {
    private _graph;
    private _cache;
    pixiApp: PIXI.Application;
    actionManager: ActionCombine;
    stateManager: StateManagerInterface;
    graphManager: GraphManagerInterface;
    operationManager: OperationAPI;
    eventManager: EventCombine;
    constructor(el: HTMLElement, graph: Graph, cache: GraphCache);
    private init;
    get graph(): Graph;
    get cache(): GraphCache;
    setGraph(graph: Graph, cache: GraphCache, callBack?: setGraphCallback): void;
}
export {};
