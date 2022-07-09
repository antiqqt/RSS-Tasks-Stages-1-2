import { CardData } from '../app/types';
import CardsData from '../../assets/data/data.json';

export default class Model {
    private state: CardData[] = [];

    constructor() {
        this.setDefaultState();
    }

    public getCurrentState(): CardData[] {
        return this.state;
    }

    private setDefaultState(): void {
        this.state = Object.values(CardsData);
    }
}
