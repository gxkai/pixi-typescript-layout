import App from './core/app/App';
import {defaultGraphStyle, mockData} from "./core/graph/constant";

export default App;

declare global {
    interface Window { CreamsPIXI: any; }
}

window.CreamsPIXI = App;
function main() {
    const container = document.body;
    const app = new App(container);
    app.setGraph({
        shapes:  [[[100,100],[100,300],[300,300],[300,100]]]//mockData
    }, {
        background: {
            url: 'test/Model.jpg'
        },
        shapesContent: []
    })
    app.operationManager.enableEdit(true);
    app.operationManager.enableFreeDrawing(true);
}
main()
