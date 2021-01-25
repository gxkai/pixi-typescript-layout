import { GraphManagerInterface } from '../graph/GraphInterface';
import { StateManagerInterface } from '../state/StateInterface';
import { ActionManagerInterface } from '../action/ActionInterface';
import { Graph, GraphCache } from '../common/Graph';
import { EventManagerInterface } from '../event/EventInterface';
export default interface AppInterface {
    graph: Graph;
    cache: GraphCache;
    pixiApp: PIXI.Application;
    actionManager: ActionManagerInterface;
    graphManager: GraphManagerInterface;
    stateManager: StateManagerInterface;
    eventManager: EventManagerInterface;
}
