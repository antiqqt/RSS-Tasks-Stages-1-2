import { CardData, CardsData, SortField, SortFieldType } from '../../../types';

export default class Cards {
    readonly containerElem;
    private sortOrder: [SortField, SortFieldType];
    private cardsElem: HTMLDivElement;
    private noResultsElem: HTMLDivElement;

    constructor(sortOrder: [SortField, SortFieldType] = ['type', 'a']) {
        this.sortOrder = sortOrder;

        this.containerElem = document.createElement('section');
        this.constructContainer();

        this.cardsElem = document.createElement('div');
        this.constructCardsElem();

        this.noResultsElem = document.createElement('div');
        this.constructNoResultsElem();

        this.containerElem.append(this.cardsElem, this.noResultsElem);
    }

    private constructContainer(): void {
        this.containerElem.classList.add('grow');
    }

    private constructCardsElem(): void {
        this.cardsElem.classList.add(
            'grid',
            'justify-items-center',
            'grid-cols-3',
            'lg:grid-cols-4',
            'xl:grid-cols-5',
            'gap-y-4',
            'mb-4'
        );
    }

    private clearCardsElem(): void {
        while (this.cardsElem.firstChild) {
            this.cardsElem.firstChild.remove();
        }
    }

    private constructNoResultsElem(): void {
        const header = document.createElement('h3');
        const text = document.createElement('p');

        this.noResultsElem.classList.add('hidden', 'flex', 'flex-col', 'justify-center', 'items-center', 'h-full');

        header.classList.add('mb-4', 'font-medium', 'text-xl', 'text-neutral-600');
        header.innerText = 'No matching results';

        text.classList.add('mb-4', 'w-3/4', 'text-sm', 'text-center');
        text.innerText = 'Unfortunately, no matching items were found. Try resetting the filters.';

        this.noResultsElem.append(header, text);
    }

    private showNoResultsElem(): void {
        this.noResultsElem.classList.remove('hidden');
    }

    private hideNoResultsElem(): void {
        this.noResultsElem.classList.add('hidden');
    }

    public draw(data: CardsData): void {
        if (this.cardsElem !== null) {
            data.forEach((cardData: CardData) => {
                const cardWrapper = document.createElement('div');
                const card = document.createElement('figure');
                const cardImgWrapper = document.createElement('div');
                const cardImg = document.createElement('img');
                const cardInfo = document.createElement('figcaption');

                cardWrapper.classList.add('relative', 'h-48', 'w-44', 'overflow-hidden', 'lg:w-52', 'xl:w-60');
                card.classList.add(
                    'h-96',
                    'hover:-translate-y-1/2',
                    'hover:bg-gray-100',
                    'transition',
                    'duration-500',
                    'cursor-pointer'
                );
                cardImgWrapper.classList.add('flex', 'justify-center', 'h-1/2');
                cardInfo.classList.add('flex', 'flex-col', 'justify-evenly', 'text-center', 'h-1/2');

                card.dataset.id = cardData.id;
                card.dataset.inCart = String(cardData.inCart);
                cardImg.src = `${cardData.imageLink}.webp`;
                cardImg.alt = cardData.type;

                const cardFields: Map<string, CardData[keyof CardData]> = new Map(Object.entries(cardData));

                for (const [field, fieldVal] of cardFields.entries()) {
                    if (['imageLink', 'id', 'inCart'].includes(field)) {
                        continue;
                    }

                    const elem = document.createElement('p');
                    elem.classList.add('capitalize');
                    elem.innerText = String(fieldVal);
                    elem.dataset.field = field;

                    if (field === 'quantity') {
                        elem.innerText += ' in stock';
                    }
                    if (field === 'price') {
                        elem.innerText += ' USD';
                    }

                    cardInfo.append(elem);
                }

                cardImgWrapper.append(cardImg);
                card.append(cardImgWrapper, cardInfo);
                cardWrapper.append(card);
                this.cardsElem.append(cardWrapper);
            });
        }
    }

    public sort(field: SortField, type: SortFieldType): void {
        const sortedCards = [...this.cardsElem.children];
        this.sortOrder = [field, type];

        sortedCards.sort((a, b) => {
            const aFieldElem = a.querySelector<HTMLParagraphElement>(`[data-field=${field}]`);
            const bFieldElem = b.querySelector<HTMLParagraphElement>(`[data-field=${field}]`);
            if (aFieldElem == null) return 0;
            if (bFieldElem == null) return 0;

            const aText = aFieldElem.innerText;
            const bText = bFieldElem.innerText;

            if (field === 'type') {
                return type === 'a' ? aText.localeCompare(bText) : bText.localeCompare(aText);
            }

            if (field === 'price') {
                const aPrice = Number.parseInt(aText);
                const bPrice = Number.parseInt(bText);

                return type === 'lowest' ? aPrice - bPrice : bPrice - aPrice;
            }

            return 0;
        });

        this.clearCardsElem();
        this.cardsElem.append(...sortedCards);
    }

    public redraw(data: CardsData): void {
        this.clearCardsElem();

        if (data.size === 0) {
            this.showNoResultsElem();
            return;
        }

        this.hideNoResultsElem();
        this.draw(data);
        this.sort(...this.sortOrder);
    }
}
