import AppInterface from "./AppInterface";
import * as PIXI from "pixi.js";
import {v4 as uuidv4} from 'uuid'
type Point = [number, number];
type ShapeType = 'ROOM'|'LINE'|'POINT';
type Shape<T extends ShapeType> = {
    type: T,
    points: Point[],
    pid: string[];
    id: string;
}
type RoomShape = Shape<'ROOM'>;
type LineShape = Shape<'LINE'>
type PointShape = Shape<'POINT'>
type ShapeData = {
    shapes: Shape<ShapeType>[];
}

export default class App implements AppInterface {
    pixiApp: PIXI.Application;
    rooms: RoomShape[] = [];
    lines: LineShape[] = [];
    points: PointShape[] = [];
    constructor(el:HTMLElement) {
        this.pixiApp = this.init(el)
    }

    private init(el: HTMLElement) {
        const app = new PIXI.Application({
            width: el.offsetWidth,
            height: el.offsetHeight,
            backgroundColor: 0xffffff,
            antialias: true
        });
        window.addEventListener("resize", function () {
            app.renderer.resize(el.offsetWidth, el.offsetHeight);
        });
        el.appendChild(app.view);
        return app;
    }

    public initData(shapeData: ShapeData) {
        this.rooms.push(...<RoomShape[]>(shapeData.shapes.filter(e => e.type === 'ROOM')))
        this.lines.push(...[
            ...<LineShape[]>(shapeData.shapes.filter(e => e.type === 'LINE')),
            ...<LineShape[]>(shapeData.shapes.filter(e => e.type === 'ROOM').reduce((pre,cur) => {
                cur.points.forEach((value, index, array) => {
                    pre.push({
                        type: "LINE",
                        points: [array[index], array[index + 1] ?? array[0]],
                        pid: [cur.id],
                        id: uuidv4()
                    })
                })
                return pre
            }, [] as LineShape[])),

        ])
        this.lines.forEach(l => {
            l.points.forEach(p => {

                const index =  this.points.findIndex(e => e.points.includes(p))
                if (
                    index > -1
                ) {
                    this.points.splice(index,1, {
                        ...this.points[index],
                        pid: this.points[index].pid.concat(l.id)
                    })
                } else {
                    this.points.push({
                        type: "POINT",
                        points: [p],
                        id: uuidv4(),
                        pid: [l.id]
                    })
                }
            })
        })
        console.log({rooms:this.rooms});
        console.log({lines:this.lines});
        console.log({points:this.points});
    }
}
