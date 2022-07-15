import { CardData, FilterOption } from '../../../types';

export class Filter {
    readonly element: HTMLElement;
    private listElement: HTMLUListElement;
    readonly type: keyof CardData;
    private chosenOptions: Set<string>;

    constructor(type: keyof CardData, options: FilterOption[]) {
        this.type = type;
        this.chosenOptions = new Set();

        this.element = document.createElement('div');
        this.constructElement(type);

        this.listElement = document.createElement('ul');
        this.constructOptionList(type, options);
        this.listElement.addEventListener('change', this.updateChosenOptions.bind(this));
    }

    private updateChosenOptions(e: Event): void {
        const checkbox = e.target;
        if (checkbox == null) return;
        if (!(checkbox instanceof HTMLInputElement)) return;

        const label = checkbox.nextElementSibling;
        if (!(label instanceof HTMLLabelElement)) return;

        const optionValue = label.innerText.toLowerCase();

        if (checkbox.checked) {
            this.chosenOptions.add(optionValue);
        } else {
            this.chosenOptions.delete(optionValue);
        }
    }

    private constructElement(type: string): void {
        const header = document.createElement('h4');
        header.innerText = type;
        header.classList.add('mb-2', 'font-medium', 'text-md', 'text-neutral-600', 'capitalize');

        this.element.append(header);
    }

    private constructOptionList(type: keyof CardData, options: FilterOption[]): void {
        this.listElement.classList.add(
            'relative',
            'scrollable',
            'overflow-y-auto',
            'px-3',
            'pb-3',
            'h-[5.3rem]',
            'text-sm',
            'text-gray-700'
        );

        options.forEach((option) => {
            const liElem = document.createElement('li');
            const wrapperElem = document.createElement('div');
            const checkboxElem = document.createElement('input');
            const labelElem = document.createElement('label');

            wrapperElem.classList.add('flex', 'items-center', 'p-1', 'rounded', 'hover:bg-gray-100');

            const idFromOption = String(option).split(' ').join('-');
            checkboxElem.id = `filter-${type}-${idFromOption}`;
            checkboxElem.type = 'checkbox';
            checkboxElem.value = '';
            checkboxElem.classList.add(
                'relative',
                'appearance-none',
                'w-[1.15rem]',
                'h-4',
                'text-blue-600',
                'bg-gray-100',
                'border',
                'border-gray-300',
                'rounded',
                'checked:bg-blue-400',
                'focus:ring-1',
                'focus:ring-blue-400',
                'cursor-pointer'
            );
            checkboxElem.addEventListener('change', () => {
                if (checkboxElem.checked) {
                    checkboxElem.classList.add('checked');
                } else {
                    checkboxElem.classList.remove('checked');
                }
            });

            labelElem.innerText = String(option);
            labelElem.htmlFor = checkboxElem.id;
            labelElem.classList.add(
                'ml-2',
                'w-full',
                'text-sm',
                'font-normal',
                'text-gray-500',
                'rounded',
                'capitalize',
                'cursor-pointer'
            );

            wrapperElem.append(checkboxElem, labelElem);
            liElem.append(wrapperElem);
            this.listElement.append(liElem);
        });

        this.element.append(this.listElement);
    }

    public getChosenOptions(): string[] {
        return [...this.chosenOptions];
    }
}
