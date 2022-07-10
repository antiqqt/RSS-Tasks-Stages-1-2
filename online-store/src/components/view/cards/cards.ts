import { CardData } from '../../app/types';

export default class Cards {
    draw(data: CardData[]): void {
        const cardsContainer = document.getElementById('cardsContainer');
        if (cardsContainer != null) {
            data.forEach((cardData: CardData) => {
                const cardWrapper = document.createElement('div');
                const card = document.createElement('figure');
                const cardImgWrapper = document.createElement('div');
                const cardImg = document.createElement('img');
                const cardInfo = document.createElement('figcaption');

                cardWrapper.classList.add('h-48', 'w-44', 'overflow-hidden', 'lg:w-52', 'xl:w-60');
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

                cardImg.src = `${cardData.imageLink}.webp`;
                cardImg.alt = cardData.type;

                const cardFields: Map<string, string> = new Map(Object.entries(cardData));

                for (const [field, fieldVal] of cardFields.entries()) {
                    if (['imageLink', 'id', 'inCart'].includes(field)) {
                        continue;
                    }

                    const elem = document.createElement('p');
                    elem.classList.add('capitalize');
                    elem.innerText = fieldVal;

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
                cardsContainer.append(cardWrapper);
            });
        }
    }
}
