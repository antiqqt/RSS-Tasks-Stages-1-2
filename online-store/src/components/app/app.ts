import Controller from '../controller/appController';
import View from '../view/appView';

export default class App {
    private view: View;
    private controller: Controller;

    constructor() {
        this.view = new View();
        this.controller = new Controller();
    }

    start(): void {
        this.view.drawCards(this.controller.getCardsData());
    }
}
