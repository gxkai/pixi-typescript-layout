// 绑定传入事件
import EventAPI, { CallbackFunc, Events } from "./EventAPI"
import { ShapeGraphics, LineGraphics, EditEnum, SelectEnum, Point } from "../common/Graph"
import AppInterface from "../app/AppInterface";
import { EventFunc, EventManagerInterface } from "./EventInterface";
import Graphics = PIXI.Graphics;


class EventAPIManager implements EventAPI {
    protected _events: Events;
    protected _app: AppInterface;
    protected _editState: EditEnum = EditEnum.Normal;//state change

    onClickGraph(callback: CallbackFunc): void {
        this._events.clickGraph = callback;
        this._bindClickGraph();
    };

    onMouseEnterShape(callback: CallbackFunc): void {
        this._events.mouseEnterShape = callback;
        this._initBindShape(callback, "mouseover");
    };

    onMouseLeaveShape(callback: CallbackFunc): void {
        this._events.mouseLeaveShape = callback;
        this._initBindShape(callback, "mouseout");
    };

    onMouseDownShape(callback: CallbackFunc): void {
        this._events.mouseDownShape = callback;
        this._initBindShape(callback, "pointerdown");
    };

    onMouseUpShape(callback: CallbackFunc): void {
        this._events.mouseUpShape = callback;
        this._initBindShape(callback, "pointerup");
    };

    onMouseMoveShape(callback: CallbackFunc): void {
        this._events.mouseUpShape = callback;
        this._initBindShape(callback, "pointermove");
    };

    onMouseDownLine(callback: CallbackFunc): void {
        this._events.mouseDownLine = callback;
        // 初始化的时候没有边
    };
    // 初始化绑定shape
    private _initBindShape(callback: CallbackFunc, event: string) {
        let shapeLayer: PIXI.Container =
            <PIXI.Container>this._app.graphManager.graphContainer.getChildByName("shapeLayer");
        shapeLayer.children.forEach((item: ShapeGraphics, index: number) => {
            item.on(event, this._bindShapeFunc(callback, item));
        })
    }
    // shape的绑定事件的回调
    protected _bindShapeFunc(callback: CallbackFunc, target: ShapeGraphics): Function {
        return (event: PIXI.InteractionEvent) => {
            callback([target.shapeIndex as number], {
                x: event.data.global.x,
                y: event.data.global.y,
                target: {
                    xMin: target.xMin as number,
                    xMax: target.xMax as number,
                    yMin: target.yMin as number,
                    yMax: target.yMax as number
                }
            }, this._editState)
        }
    }
    // line的绑定事件的回调
    protected _bindLineFunc(callback: CallbackFunc, target: LineGraphics): Function {
        let index: number = Number(target.name.substring(5));
        return (event: PIXI.InteractionEvent) => {
            let startPoint: Point = target.startPoint as Point, endPoint: Point = target.endPoint as Point;
            callback([index], {
                x: event.data.global.x,
                y: event.data.global.y,
                target: {
                    xMin: startPoint[0] < endPoint[0] ? startPoint[0] : endPoint[0],
                    xMax: startPoint[0] > endPoint[0] ? startPoint[0] : endPoint[0],
                    yMin: startPoint[1] < endPoint[1] ? startPoint[1] : endPoint[1],
                    yMax: startPoint[1] > endPoint[1] ? startPoint[1] : endPoint[1]
                }
            }, this._editState)
        }
    }
    // 绑定graph
    protected _bindClickGraph(): void {
        let backgroundLayer: PIXI.Container =
            <PIXI.Container>this._app.graphManager.graphContainer.getChildByName("backgroundLayer");
        backgroundLayer.getChildAt(0).on("click", (event: PIXI.InteractionEvent) => {
            this._events.clickGraph([], {
                x: event.data.global.x,
                y: event.data.global.y
            }, this._editState)
        })
    };
    // 绑定一个shape的所有事件
    protected _bindShapes() {
        let shapeLayer: PIXI.Container =
            <PIXI.Container>this._app.graphManager.graphContainer.getChildByName("shapeLayer");
        shapeLayer.children.forEach((item: ShapeGraphics, index: number) => {
            this._bindShapeEvents(item);
        })
    }

    protected _bindShapeEvents(item: ShapeGraphics, ) {
        item.on('mouseover', this._bindShapeFunc(this._events.mouseEnterShape, item))
            .on('mouseout', this._bindShapeFunc(this._events.mouseLeaveShape, item))
            .on('mousemove', this._bindShapeFunc(this._events.mouseMoveShape, item))
            .on('pointerdown', this._bindShapeFunc(this._events.mouseDownShape, item))
            .on('pointerup', this._bindShapeFunc(this._events.mouseUpShape, item));
    }

}

export default class EventManager extends EventAPIManager implements EventManagerInterface {
    constructor(app: AppInterface) {
        super();
        this._app = app;
        //初始化_events
        this._events = {
            clickGraph: () => { },
            mouseEnterShape: () => { },
            mouseLeaveShape: () => { },
            mouseDownShape: () => { },
            mouseUpShape: () => { },
            mouseDownLine: () => { },
            mouseMoveShape: () => {}
        }
    }

    setEditState(state: EditEnum): void {
        this._editState = state;
    }

    bindAllHandler(): void {
        //this._bindClickGraph(); // new app的时候graphContainer已经生成
        this._bindShapes();
    }

    bindHandler(selectType: SelectEnum, target: Graphics): void {
        switch (selectType) {
            case SelectEnum.Shape:
                console.log('----> shape')
                this._bindShapeEvents(target as ShapeGraphics);
                break;
            case SelectEnum.Line:
                console.log('----> line')
                target.on("pointerdown", this._bindLineFunc(this._events.mouseDownLine, target as LineGraphics));
                break;
            default:
                console.error("无法绑定该对象")
        }
    }

}
