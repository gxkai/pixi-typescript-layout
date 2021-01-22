import App from './core/app/App';
import {LineStyle, ShapeContent} from "./core/common/Graph";
import {defaultGraphStyle} from "./core/graph/constant";

export default App;

declare global {
    interface Window { CreamsPIXI: any; }
}

window.CreamsPIXI = App;
function main() {
    const container = document.body;
    const app = new App(container);
    app.setGraph({
        shapes: []// data
    }, {
        background: {
            url: 'test/Model.jpg'
        },
        shapesContent: []
    })
    app.operationManager.enableEdit(true);
    app.operationManager.enableFreeDrawing(true);
    app.actionManager.addShape(100, 100, 200, 200, defaultGraphStyle)
}
main()
