import { CardsData } from '../../types';
import DB from '../../assets/data/data.json';

export default class Model {
    private state: CardsData;

    constructor() {
        this.state = new Map(Object.entries(DB));
    }

    public getCurrentState(): CardsData {
        return this.state;
    }
}
