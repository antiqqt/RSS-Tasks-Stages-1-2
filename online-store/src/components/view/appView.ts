import { CardData, CardsData, FilterOption, SearchQuery, SortField, SortFieldType } from '../../types';
import Cards from './cards/cards';
import Cart from './cart/cart';
import Filters from './filters/filters';
import Slider from './filters/slider/slider';
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

    public sortCards(sortOrder: [SortField, SortFieldType]): void {
        this.cards.sort(sortOrder);
    }

    public drawCards(data: CardsData): void {
        this.cards.draw(data);
    }

    public getCardsContainer(): HTMLElement {
        return this.cards.containerElem;
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
        return this.filters.getFilterQuery();
    }

    public redrawCards(data: CardsData): void {
        this.cards.redraw(data);
    }

    public drawSlider(type: 'quantity' | 'year'): void {
        this.filters.addSlider(type);
    }

    public getSliders(): Slider[] {
        return this.filters.getSliders();
    }

    public addResetFiltersBtn(): void {
        this.filters.addResetBtn('filters');
    }

    public addResetSettingsBtn(): void {
        this.filters.addResetBtn('settings');
    }

    public addResetFiltersBtnOnClick(callback: () => void): void {
        this.filters.addResetBtnOnClick('filters', callback);
    }

    public addResetSettingsBtnOnClick(callback: () => void): void {
        this.filters.addResetBtnOnClick('settings', callback);
    }

    public resetAllFilters(): void {
        this.filters.resetAll();
    }

    public applySavedFiltersState(query: SearchQuery): void {
        this.filters.applySavedState(query);
    }

    public setSortOption(newSortOrder: [SortField, SortFieldType]): void {
        this.sort.setOption(newSortOrder);
    }

    public getSearchBarQuery(): string | null {
        return this.filters.getSearchBarQuery();
    }

    public setSearchBarValue(savedVal: string | null): void {
        this.filters.setSearchBarValue(savedVal);
    }

    public addSearchBarOnInput(cb: () => void): void {
        this.filters.addSearchBarOnInput(cb);
    }

    public addSearchBarOnClear(cb: () => void): void {
        this.filters.addSearchBarOnClear(cb);
    }
}
