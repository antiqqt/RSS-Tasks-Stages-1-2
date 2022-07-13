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
        header.classList.add('mb-4', 'font-medium', 'text-xl', 'text-neutral-600', 'capitalize');

        this.element.append(header);
    }

    private constructSelect(): void {
        this.selectElement.classList.add(
            'min-w-[10.5rem]',
            'px-2',
            'py-1',
            'rounded-md',
            'bg-gray-200',
            'capitalize',
            'cursor-pointer'
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
}
