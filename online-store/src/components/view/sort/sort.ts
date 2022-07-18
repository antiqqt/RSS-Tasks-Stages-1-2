import { SortField, SortFieldType } from '../../../types';

export default class Sort {
    readonly element: HTMLElement;
    readonly selectElement: HTMLSelectElement;

    constructor() {
        this.element = document.createElement('div');
        this.constructElement();

        this.selectElement = document.createElement('select');
        this.constructSelect();
    }

    private constructElement(): void {
        const header = document.createElement('h3');
        header.innerText = 'sort by';
        header.classList.add(
            'mb-4',
            'pb-1',
            'font-medium',
            'text-xl',
            'text-neutral-600',
            'capitalize',
            'border-b-2',
            'border-blue-400'
        );

        this.element.append(header);
    }

    private constructSelect(): void {
        this.selectElement.classList.add(
            'min-w-full',
            'px-2',
            'py-1',
            'rounded-md',
            'bg-gray-200',
            'capitalize',
            'cursor-pointer',
            'font-medium',
            'text-gray-500',
            'border-2',
            'border-transparent',
            'rounded',
            'transition-colors',
            'cursor-pointer',
            'focus:outline-none',
            'focus:border-gray-400'
        );

        this.selectElement.name = 'sort';

        this.selectElement.append(
            this.createOption('type-a', 'name (a - z)'),
            this.createOption('type-z', 'name (z - a)'),
            this.createOption('price-lowest', 'price (lowest)'),
            this.createOption('price-highest', 'price (highest)')
        );

        this.element.append(this.selectElement);
    }

    private createOption(value: string, innerText: string): HTMLOptionElement {
        const option = document.createElement('option');
        option.innerText = innerText;
        option.value = value;
        return option;
    }

    public setOption(newSortOrder: [SortField, SortFieldType]): void {
        const [field, type] = newSortOrder;

        [...this.selectElement.options].forEach((optionElem, optionIndex) => {
            if (optionElem.value === `${field}-${type}`) {
                this.selectElement.selectedIndex = optionIndex;
            }
        });
    }
}
