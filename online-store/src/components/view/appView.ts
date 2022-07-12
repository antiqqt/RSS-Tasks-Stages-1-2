import { CardData, CardsData, FilterOption } from '../../types';
import Cards from './cards/cards';
import Cart from './cart/cart';
import Filters from './filters/filters';

export default class View {
    private cards: Cards;
    private cart: Cart;
    private filters: Filters;

    constructor() {
        this.cards = new Cards();
        this.cart = new Cart();
        this.filters = new Filters();

        const mainContent = document.getElementById('mainContent');
        if (mainContent != null) {
            mainContent.append(this.filters.element, this.cards.element);
        }
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

    public getFiltersContainer(): HTMLElement {
        return this.filters.element;
    }

    public drawFilter(filterType: keyof CardData, options: FilterOption[]): void {
        this.filters.addFilter(filterType, options);
    }
}
