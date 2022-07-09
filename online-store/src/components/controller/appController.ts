import { CardData } from '../app/types';
import Model from '../model/appModel';

export default class Controller {
    private model: Model;

    constructor() {
        this.model = new Model();
    }

    getCardsData(): CardData[] {
        return this.model.getCurrentState();
    }
}
