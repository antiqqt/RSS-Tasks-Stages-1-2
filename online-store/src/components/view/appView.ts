import { CardData, CardsData, FilterOption, SearchQuery, SortField, SortFieldType } from '../../types';
import Cards from './cards/cards';
import Cart from './cart/cart';
import Filters from './filters/filters';
import Sort from './sort/sort';

export default class View {
    private cards: Cards;
    private cart: Cart;
    private sort: Sort;
    private filters: Filters;

    constructor() {
        this.cards = new Cards();
        this.cart = new Cart();
        this.sort = new Sort();
        this.filters = new Filters();
    }

    public sortCards(field: SortField, type: SortFieldType): void {
        this.cards.sort(field, type);
    }

    public drawCards(data: CardsData): void {
        this.cards.draw(data);
    }

    public getCardsContainer(): HTMLElement {
        return this.cards.element;
    }

    public getCartElement(): HTMLElement {
        return this.cart.element;
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

    public getSortElement(): HTMLElement {
        return this.sort.element;
    }

    public getSortSelectElement(): HTMLSelectElement {
        return this.sort.selectElement;
    }

    public getFilterQuery(): SearchQuery {
        return this.filters.getQuery();
    }

    public redrawCards(data: CardsData): void {
        this.cards.redraw(data);
    }
}
