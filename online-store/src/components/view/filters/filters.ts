import { CardData, FilterOption, SearchQuery } from '../../../types';
import Filter from './filter/filter';
import Slider from './slider/slider';
import ResetBtn from './resetBtn/resetBtn';
import Search from './search/search';

export default class Filters {
    readonly element: HTMLDivElement;
    private filters: (Filter | Slider)[];
    private resetFiltersBtn: ResetBtn;
    private resetSettingsBtn: ResetBtn;
    private searchBar: Search;

    constructor() {
        this.filters = [];
        this.resetFiltersBtn = new ResetBtn('Reset filters');
        this.resetSettingsBtn = new ResetBtn('Reset all settings');
        this.searchBar = new Search();

        this.element = document.createElement('div');
        this.constructOwnElement();

        const header = document.createElement('h3');
        header.innerText = 'Filters';
        header.classList.add(
            'pb-1',
            'font-medium',
            'text-xl',
            'text-neutral-600',
            'capitalize',
            'border-b-2',
            'border-blue-400'
        );

        this.element.append(header);
        this.element.append(this.searchBar.element);
    }

    private constructOwnElement(): void {
        this.element.classList.add('flex', 'flex-col', 'gap-y-3');
    }

    private appendElem(elem: HTMLElement): void {
        this.element.append(elem);
    }

    public addFilter(type: keyof CardData, options: FilterOption[]): void {
        const newFilter = new Filter(type, options);
        this.element.append(newFilter.element);
        this.filters.push(newFilter);
    }

    public addSlider(type: 'quantity' | 'year'): void {
        const newSlider = new Slider(type);

        this.element.append(newSlider.element);
        this.filters.push(newSlider);
    }

    public getFilterQuery(): SearchQuery {
        const query: SearchQuery = new Map();
        return this.filters.reduce((query, filter) => query.set(filter.type, filter.getChosenOptions()), query);
    }

    public getSliders(): Slider[] {
        return this.filters.filter((filter) => filter instanceof Slider) as Slider[];
    }

    public addResetBtn(type: 'filters' | 'settings'): void {
        type === 'filters'
            ? this.appendElem(this.resetFiltersBtn.element)
            : this.appendElem(this.resetSettingsBtn.element);
    }

    public addResetBtnOnClick(type: 'filters' | 'settings', callback: () => void): void {
        type === 'filters'
            ? this.resetFiltersBtn.element.addEventListener('click', callback)
            : this.resetSettingsBtn.element.addEventListener('click', callback);
    }

    public addResetFiltersBtn(): void {
        this.element.append(this.resetFiltersBtn.element);
    }

    public addResetFiltersBtnOnClick(callback: () => void): void {
        this.resetFiltersBtn.element.addEventListener('click', callback);
    }

    public resetAll(): void {
        this.filters.forEach((filter) => filter.reset());
        this.searchBar.reset();
    }

    public applySavedState(savedQuery: SearchQuery): void {
        for (const filter of this.filters) {
            const savedState = savedQuery.get(filter.type);
            if (savedState == null) continue;
            if (savedState.length < 1) continue;

            filter.setSavedOptions(savedState);
        }
    }

    public getSearchBarQuery(): string | null {
        const searchBarInput = this.searchBar.input.value;

        return searchBarInput.length > 0 ? searchBarInput : null;
    }

    public setSearchBarValue(savedVal: string | null): void {
        if (savedVal == null) {
            this.searchBar.input.value = '';
        } else {
            this.searchBar.input.value = savedVal;
            this.searchBar.showClearBtn();
        }
    }

    public addSearchBarOnInput(cb: () => void): void {
        this.searchBar.input.addEventListener('input', cb);
    }

    public addSearchBarOnClear(cb: () => void): void {
        this.searchBar.clearBtn.addEventListener('click', cb);
    }
}
