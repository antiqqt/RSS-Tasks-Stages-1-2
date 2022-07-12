import { CardData, CardsData } from '../../../types';

export default class Cards {
    readonly element;

    constructor() {
        this.element = document.createElement('section');
        this.element.classList.add(
            'grow',
            'grid',
            'justify-items-center',
            'grid-cols-3',
            'lg:grid-cols-4',
            'xl:grid-cols-5',
            'gap-y-4',
            'mb-4'
        );
    }

    public draw(data: CardsData): void {
        if (this.element !== null) {
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
                this.element.append(cardWrapper);
            });
        }
    }
}
