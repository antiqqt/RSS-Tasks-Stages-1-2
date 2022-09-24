export default class Search {
    readonly element: HTMLDivElement;
    readonly input: HTMLInputElement;
    readonly clearBtn: HTMLButtonElement;

    constructor() {
        this.element = document.createElement('div');
        this.constructOwnElement();

        this.input = document.createElement('input');
        this.constructInputElement();

        this.clearBtn = document.createElement('button');
        this.constructBtnElement();

        this.element.append(this.input, this.clearBtn);
    }

    private constructOwnElement(): void {
        this.element.classList.add('relative', 'flex', 'justify-center', 'w-full');
    }

    private constructInputElement(): void {
        this.input.type = 'text';
        this.input.placeholder = 'Search...';
        this.input.autocomplete = 'off';
        this.input.autofocus = true;

        this.input.addEventListener('input', () => {
            this.input.value.length > 0 ? this.showClearBtn() : this.hideClearBtn();
        });

        this.input.classList.add(
            'block',
            'w-full',
            'px-2',
            'py-1',
            'font-medium',
            'text-gray-500',
            'border-2',
            'border-transparent',
            'rounded',
            'bg-gray-200',
            'transition-colors',
            'cursor-pointer',
            'caret-gray-500',
            'focus:outline-none',
            'focus:border-gray-400'
        );
    }

    private constructBtnElement(): void {
        this.clearBtn.innerText = '✕';

        this.clearBtn.addEventListener('click', this.reset.bind(this));

        this.clearBtn.classList.add(
            'hidden',
            'absolute',
            'top-2',
            'right-1',
            'flex',
            'justify-center',
            'items-center',
            'w-5',
            'h-5',
            'text-sm',
            'font-medium',
            'border',
            'border-transparent',
            'rounded-full',
            'bg-gray-300',
            'transition-colors',
            'cursor-pointer',
            'hover:border-gray-400'
        );
    }

    public showClearBtn(): void {
        this.clearBtn.classList.remove('hidden');
    }

    private hideClearBtn(): void {
        this.clearBtn.classList.add('hidden');
    }

    public addOnInputHandler(cb: () => void): void {
        this.input.addEventListener('input', cb);
    }

    public reset(): void {
        this.input.value = '';
        this.hideClearBtn();
    }
}
