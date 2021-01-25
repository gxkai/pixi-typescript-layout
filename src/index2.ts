import App from "./chore/app/App";
import {v4 as uuidv4} from 'uuid'
function main() {
    const container = document.body;
    const app = new App(
        container
    )
    app.initData({
        shapes: [
            {
                type: "ROOM",
                points: [[100,100],[100,300],[300,300],[300,100]],
                pid: [],
                id: uuidv4()
            }
        ]
    })
}
main();
