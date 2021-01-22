import * as PIXI from 'pixi.js'

export interface DraggableObj extends PIXI.DisplayObject {
    dragData?: PIXI.InteractionData,
    dragging?: number,
    dragPointerStart?: PIXI.Point,
    dragObjStart?: PIXI.Point,
    dragGlobalStart?: PIXI.Point,
}

function onDragStart(event: PIXI.InteractionEvent) {
    let obj = <DraggableObj>event.currentTarget;
    obj.dragData = event.data;
    obj.dragging = 1;
    obj.dragPointerStart = event.data.getLocalPosition(obj.parent);
    obj.dragObjStart = new PIXI.Point();
    obj.dragObjStart.copyFrom(obj.position);
    obj.dragGlobalStart = new PIXI.Point();
    obj.dragGlobalStart.copyFrom(event.data.global);
}

function onDragEnd(event: PIXI.InteractionEvent) {
    let obj = <DraggableObj>event.currentTarget;
    if (obj.dragging == 1) {
        // toggle(obj);
    } else {
        // snap(obj);
    }
    obj.dragging = 0;
    obj.dragData = undefined;
    // set the interaction data to null
}

function onDragMove(event: PIXI.InteractionEvent) {
    let obj = <DraggableObj>event.currentTarget;
    if (!obj.dragging) return;
    let data = obj.dragData as PIXI.InteractionData; // it can be different pointer!
    if (obj.dragging == 1) {
        // click or drag?
        if (Math.abs(data.global.x - obj.dragGlobalStart!.x) +
            Math.abs(data.global.y - obj.dragGlobalStart!.y) >= 3) {
            // DRAG
            obj.dragging = 2;
        }
    }
    if (obj.dragging == 2) {
        let dragPointerEnd = data.getLocalPosition(obj.parent);
        // DRAG
        obj.position.set(
            obj.dragObjStart!.x + (dragPointerEnd.x - obj.dragPointerStart!.x),
            obj.dragObjStart!.y + (dragPointerEnd.y - obj.dragPointerStart!.y)
        );
    }
}

export default function DragHelper(container: DraggableObj, enable: boolean = true) {
    if (enable) {
        container.interactive = true;
        container.on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
    } else {
        container.interactive = false;
        container.dragging = 0;
        container.dragData = undefined;
        container.off('pointerdown', onDragStart)
            .off('pointerup', onDragEnd)
            .off('pointerupoutside', onDragEnd)
            .off('pointermove', onDragMove);
    }
}
