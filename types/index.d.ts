import App from './core/app/App';
export default App;
declare global {
    interface Window {
        TurboPIXI: any;
    }
}
