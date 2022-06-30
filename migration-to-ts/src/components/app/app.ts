import { EverythingResponse, SourcesResponse } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesContainer = document.querySelector('.sources') as HTMLDivElement;

        sourcesContainer.addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data as EverythingResponse))
        );

        this.controller.getSources((data) => this.view.drawSources(data as SourcesResponse));
    }
}

export default App;
