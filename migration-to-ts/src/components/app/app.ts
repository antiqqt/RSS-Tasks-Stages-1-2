import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        this.view.drawMenu();

        const sourcesContainer = document.querySelector<HTMLDivElement>('.sources');

        if (sourcesContainer !== null) {
            sourcesContainer.addEventListener('click', (e) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
        }

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
