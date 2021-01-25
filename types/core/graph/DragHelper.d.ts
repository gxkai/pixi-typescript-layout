import * as PIXI from 'pixi.js';
export interface DraggableObj extends PIXI.DisplayObject {
    dragData?: PIXI.InteractionData;
    dragging?: number;
    dragPointerStart?: PIXI.Point;
    dragObjStart?: PIXI.Point;
    dragGlobalStart?: PIXI.Point;
}
export default function DragHelper(container: DraggableObj, enable?: boolean): void;
