import { CardData, FilterOption } from '../../../types';
import { Filter } from '../filter/filter';

export default class Filters {
    readonly element: HTMLElement;
    private filters: Filter[] = [];

    constructor() {
        this.element = document.createElement('aside');
        this.constructElement();
    }

    private constructElement(): void {
        this.element.classList.add('sticky', 'top-4', 'self-start', 'flex', 'flex-col', 'gap-y-5', 'min-w-[10rem]');
    }

    public addFilter(type: keyof CardData, options: FilterOption[]): void {
        const newFilter = new Filter(type, options);
        this.filters.push(newFilter);
        this.element.append(newFilter.element);
    }
}
