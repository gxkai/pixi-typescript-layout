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
    roomsLayer: PIXI.Container = new PIXI.Container();
    linesLayer: PIXI.Container = new PIXI.Container();
    pointsLayer: PIXI.Container = new PIXI.Container();
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
        app.stage.addChild(this.roomsLayer)
        app.stage.addChild(this.linesLayer)
        app.stage.addChild(this.pointsLayer)
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
        this.lines.forEach(lineShape => {
            this.linesLayer.addChild(this.drawLine(lineShape))
        })
        this.points.forEach(pointShape => {
            this.pointsLayer.addChild(this.drawPoint(pointShape))
        })
        this.rooms.forEach(roomShape => {
            this.roomsLayer.addChild(this.drawRoom(roomShape));
        })
    }

    drawLine(lineShape:LineShape) {
        const graphics  = new PIXI.Graphics();
        const color = 0x000000
        graphics.lineStyle(10, color, 1);
        graphics.beginFill(color, 1)
        const pointStart = lineShape.points[0];
        const pointEnd = lineShape.points[1];
        graphics.moveTo(pointStart[0], pointStart[1]);
        graphics.lineTo(pointEnd[0], pointEnd[1]);
        graphics.endFill();
        graphics.hitArea = graphics.getBounds();
        graphics.interactive = true;
        return graphics;
    }
    drawPoint(pointShape: PointShape) {
        const graphics  = new PIXI.Graphics();
        const color = 0x000000
        graphics.beginFill(color, 1)
        graphics.drawCircle(0, 0, 10);
        const point = pointShape.points[0];
        graphics.x = point[0];
        graphics.y = point[1];
        graphics.endFill();
        graphics.hitArea = graphics.getBounds();
        graphics.interactive = true;
        return graphics;
    }
    drawRoom(roomShape: RoomShape) {
        const graphics  = new PIXI.Graphics();
        const lineColor = 0x000000;
        const fillColor = 0xffffff;
        const fillImage = 'test/Floor.jpeg'
        graphics.lineStyle(10, lineColor, 1);
        graphics.beginFill(fillColor, 1)
        graphics.beginTextureFill({
            texture: new PIXI.Texture(PIXI.BaseTexture.from(fillImage)),
        })
        roomShape.points.forEach((value, index, array) => {
            if (index === 0) {
                graphics.moveTo(value[0], value[1])
            } else {
                graphics.lineTo(value[0], value[1]);
            }
        })
        graphics.closePath();
        return graphics;
    }
}
