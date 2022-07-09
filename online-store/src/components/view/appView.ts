import { CardData } from '../app/types';
import Cards from './cards/cards';

export default class View {
    private cards: Cards;

    constructor() {
        this.cards = new Cards();
    }

    drawCards(data: CardData[]): void {
        this.cards.draw(data);
    }
}
