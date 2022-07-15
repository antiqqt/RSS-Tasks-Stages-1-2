export default class Cart {
    readonly element: HTMLElement;
    private counter: HTMLElement;
    private modal: HTMLElement;

    constructor(initialCount = 0) {
        this.element = document.createElement('div');
        this.constructElement();

        this.counter = document.createElement('div');
        this.constructCounter(initialCount);

        this.modal = document.createElement('div');
        this.constructModal();

        this.element.append(this.counter, this.modal);
    }

    private constructElement(): void {
        this.element.classList.add('flex', 'flex-col', 'items-center', 'gap-x-2', 'w-20', 'h-full');
        this.element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19">
        <g fill="#595859"><path d="M5 6L4 4l4-4 1.6 1.1L5 6zM16 6l1-2-4-4-2 1 5 5zM0 7l2 12h17l2-12H0z"></path></g></svg>`;
    }

    private constructCounter(initialCount: number): void {
        this.counter.classList.add('w-full', 'text-center', 'text-blue-400', 'text-lg', 'font-semibold');
        this.counter.innerText = String(initialCount);
    }

    private constructModal(): void {
        const modalWrapper = this.modal;
        const modalBlock = document.createElement('div');
        const modalIcon = document.createElement('div');
        const modalHeader = document.createElement('h3');
        const modalText = document.createElement('p');
        const modalBtn = document.createElement('button');

        modalWrapper.classList.add(
            'hidden',
            'fixed',
            'inset-0',
            'flex',
            'justify-center',
            'items-center',
            'bg-gray-900/50',
            'z-10',
            'hover:cursor-pointer'
        );

        modalWrapper.dataset.isModal = 'true';
        modalWrapper.addEventListener('click', (e: Event) => {
            const target = e.target;
            if (target == null) return;
            if (target !== modalWrapper) return;

            this.hideModal();
        });

        modalBlock.classList.add(
            'flex',
            'flex-col',
            'items-center',
            'px-2',
            'py-3',
            'bg-gray-100',
            'rounded-md',
            'hover:cursor-default'
        );

        modalIcon.classList.add(
            'flex',
            'self-start',
            'items-center',
            'justify-center',
            'h-12',
            'w-12',
            'rounded-full',
            'bg-red-100'
        );

        modalIcon.innerHTML = `
        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>`;

        modalHeader.classList.add('mb-4', 'font-medium', 'text-xl', 'text-neutral-600');
        modalHeader.innerText = 'Shopping cart is full';

        modalText.classList.add('mb-4', 'w-3/4', 'text-sm', 'text-center');
        modalText.innerText = 'Unfortunately, only up to 20 items can be added at the same time.';

        modalBtn.classList.add(
            'w-20',
            'px-4',
            'py-1',
            'text-md',
            'uppercase',
            'bg-gray-200',
            'border-2',
            'hover:border-blue-300',
            'rounded-md',
            'transition-colors',
            'duration-200'
        );
        modalBtn.innerText = 'ok';
        modalBtn.addEventListener('click', () => this.hideModal());

        modalBlock.append(modalIcon, modalHeader, modalText, modalBtn);
        modalWrapper.append(modalBlock);
    }

    public showModal(): void {
        this.modal.classList.remove('hidden');
    }

    private hideModal(): void {
        this.modal.classList.add('hidden');
    }

    public updateCounter(value: number): void {
        this.counter.innerText = String(value);
    }
}
