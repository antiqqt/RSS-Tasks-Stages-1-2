import { CardData, FilterOption } from '../../../types';

export class Filter {
    readonly element: HTMLElement;
    private selectElement: HTMLSelectElement;

    constructor(type: keyof CardData, options: FilterOption[]) {
        this.element = document.createElement('div');
        this.constructElement(type);

        this.selectElement = document.createElement('select');
        this.constructSelect(type, options);
    }

    private constructElement(filterName: string): void {
        const header = document.createElement('h3');
        header.innerText = filterName;
        header.classList.add('mb-4', 'font-medium', 'text-xl', 'text-neutral-600', 'capitalize');

        this.element.append(header);
    }

    private constructSelect(filterName: keyof CardData, options: FilterOption[]): void {
        this.selectElement.classList.add(
            'min-w-[10.5rem]',
            'px-2',
            'py-1',
            'rounded-md',
            'bg-gray-200',
            'capitalize',
            'cursor-pointer'
        );

        this.selectElement.name = filterName;

        options.forEach((option) => {
            const optionElem = document.createElement('option');
            optionElem.innerText = String(option);
            optionElem.value = String(option);
            this.selectElement.append(optionElem);
        });

        this.element.append(this.selectElement);
    }
}
