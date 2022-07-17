export default class ResetBtn {
    readonly element: HTMLButtonElement;

    constructor(innerText: string) {
        this.element = document.createElement('button');
        this.constructOwnElement(innerText);
    }

    private constructOwnElement(innerText: string): void {
        this.element.innerText = innerText;
        this.element.classList.add(
            'block',
            'mx-auto',
            'px-[0.8em]',
            'py-[0.1em]',
            'font-medium',
            'text-gray-500',
            'border-2',
            'border-transparent',
            'rounded',
            'bg-gray-200',
            'transition-colors',
            'cursor-pointer',
            'hover:border-gray-400'
        );
    }
}
