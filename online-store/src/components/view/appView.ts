import { CardsData } from '../../types';
import Cards from './cards/cards';
import Cart from './cart/cart';

export default class View {
    private cards: Cards;
    private cart: Cart;

    constructor() {
        this.cards = new Cards();
        this.cart = new Cart();
    }

    public drawCards(data: CardsData): void {
        this.cards.draw(data);
    }

    public getCardsContainer(): HTMLElement {
        return this.cards.element;
    }

    public updateCartCounter(value: number): void {
        this.cart.updateCounter(value);
    }

    public showCartModal(): void {
        this.cart.showModal();
    }
}
