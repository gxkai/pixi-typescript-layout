import * as PIXI from "pixi.js";
import AppInterface from './AppInterface';
import AppAPI from "./AppAPI";
import ActionAPI from "../action/ActionAPI";
import OperationAPI from "../operation/OperationAPI";
import EventAPI from "../event/EventAPI";
import {StateManagerInterface} from '../state/StateInterface';
import {ActionManagerInterface} from "../action/ActionInterface";
import {GraphManagerInterface, setGraphCallback} from "../graph/GraphInterface";
import {EventManagerInterface} from "../event/EventInterface";
import GraphManager from '../graph/GraphManager';
import OperationManager from '../operation/OperationManager';
import EventManager from '../event/EventManager';
import ActionManager from '../action/ActionManager';
import StateManager from "../state/StateManager";
import {Graph, GraphCache, SelectEnum} from "../common/Graph";
import PixiFps from "pixi-fps";
import {defaultGraphStyle} from "../graph/constant";

interface ActionCombine extends ActionAPI, ActionManagerInterface { }
interface EventCombine extends EventAPI, EventManagerInterface { }


export default class App implements AppInterface, AppAPI {
    private _graph: Graph;
    private _cache: GraphCache;
    pixiApp: PIXI.Application;
    actionManager: ActionCombine;
    stateManager: StateManagerInterface;
    graphManager: GraphManagerInterface;
    operationManager: OperationAPI;
    eventManager: EventCombine;

    constructor(el: HTMLElement) {
        this.pixiApp = this.init(el);
        this.graphManager = new GraphManager(this) as GraphManagerInterface;
        this.operationManager = new OperationManager(this);
        this.eventManager = new EventManager(this);
        this.actionManager = new ActionManager(this);
        this.stateManager = new StateManager(this);
        this.pixiApp.stage.interactive = true;
        this.pixiApp.stage.on('pointerdown', (event: PIXI.InteractionEvent) => {
            if (this.stateManager.isEnableFreeDrawing()) {
                console.log('-----> pointerdown stage')
                // const {x, y} = event.data.global;
                // this.actionManager.addShape(x, y, 0, 0, defaultGraphStyle)
            }
        })
    }

    private init(el: HTMLElement) {
        const app = new PIXI.Application({
            width: el.offsetWidth,
            height: el.offsetHeight,
            backgroundColor: 0xffffff,
            antialias: true
        });
        // const fpsCounter = new PixiFps();
        // app.stage.addChild(fpsCounter)
        window.addEventListener("resize", function () {
            app.renderer.resize(el.offsetWidth, el.offsetHeight);
        });
        el.appendChild(app.view);

        return app;
    }

    public get graph(): Graph {
        return this._graph;
    }

    public get cache(): GraphCache {
        return this._cache;
    }

    setGraph(graph: Graph, cache: GraphCache, callBack?: setGraphCallback) {
        this._graph = graph;
        this._cache = cache;
        this.actionManager.init(graph);
        this.graphManager.setGraph(graph, cache, callBack);
        this.eventManager.bindAllHandler();
    }
}
