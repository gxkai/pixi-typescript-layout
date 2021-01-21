import App from './core/app/App';

export default App;

declare global {
    interface Window { CreamsPIXI: any; }
}

window.CreamsPIXI = App;
// function main() {
//     const container = document.getElementById('container') as HTMLElement;
//     const app = new App(container);
//     const pixi = app.pixiApp;
// }
// main()
