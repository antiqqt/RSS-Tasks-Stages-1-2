import { CardData, FilterOption, SearchQuery } from '../../../types';
import { Filter } from './filter/filter';
import Slider from './slider/slider';
import { ResetBtn } from './resetBtn/resetBtn';

export default class Filters {
    readonly element: HTMLDivElement;
    private filters: (Filter | Slider)[];
    private resetBtn: ResetBtn;

    constructor() {
        this.filters = [];
        this.resetBtn = new ResetBtn();

        this.element = document.createElement('div');
        this.constructElement();

        const header = document.createElement('h3');
        header.innerText = 'Filters';
        header.classList.add(
            'font-medium',
            'text-xl',
            'text-neutral-600',
            'capitalize',
            'border-b-2',
            'border-blue-400'
        );

        this.element.append(header);
    }

    private constructElement(): void {
        this.element.classList.add('flex', 'flex-col', 'gap-y-3');
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

    public getQuery(): SearchQuery {
        const query: SearchQuery = new Map();
        return this.filters.reduce((query, filter) => query.set(filter.type, filter.getChosenOptions()), query);
    }

    public getSliders(): Slider[] {
        return this.filters.filter((filter) => filter instanceof Slider) as Slider[];
    }

    public addResetBtn(): void {
        this.element.append(this.resetBtn.element);
    }

    public addResetBtnOnClick(callback: () => void): void {
        this.resetBtn.element.addEventListener('click', callback);
    }

    public resetAll(): void {
        this.filters.forEach((filter) => filter.reset());
    }
}
