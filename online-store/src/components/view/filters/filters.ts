import { CardData, FilterOption, SearchQuery } from '../../../types';
import { Filter } from '../filter/filter';

export default class Filters {
    readonly element: HTMLDivElement;
    private filters: Filter[];

    constructor() {
        this.filters = [];

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
        this.element.classList.add('flex', 'flex-col', 'gap-y-2');
    }

    public addFilter(type: keyof CardData, options: FilterOption[]): void {
        const newFilter = new Filter(type, options);
        this.element.append(newFilter.element);
        this.filters.push(newFilter);
    }

    getQuery(): SearchQuery {
        const query: SearchQuery = new Map();
        return this.filters.reduce((query, filter) => query.set(filter.type, filter.getChosenOptions()), query);
    }
}
