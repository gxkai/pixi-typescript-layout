import App from './core/app/App';
import {LineStyle, ShapeContent} from "./core/common/Graph";

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
    const defaultGraphStyle: ShapeContent = {
        backgroundColor: 0xD1D8DF,
        backgroundImage: 'test/Floor.jpeg',
        border: {
            lineWidth: 2,
            color: 0xA7ACB2,
            lineStyle: LineStyle.Dashed
        },
        font: {
            fontSize: 14,
            fill: [0x000000]
        },
        content: "",
        hasMark: false,
        alpha: 1,
    };
    app.actionManager.addShape(100, 100, 200, 200, defaultGraphStyle)

}
main()
