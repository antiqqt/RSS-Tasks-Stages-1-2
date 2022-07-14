import { CardData, CardsData, Errors, FilterOption, SearchQuery } from '../../types';
import Model from '../model/appModel';

export default class Controller {
    private model: Model;

    constructor() {
        this.model = new Model();
    }

    public getCardsData(): CardsData {
        return this.model.getCurrentState();
    }

    public checkInCart(id: string): boolean {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        return data.inCart;
    }

    addToCart(id: string): void {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        data.inCart = true;
    }

    removeFromCart(id: string): void {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        data.inCart = false;
    }

    getNumOfItemsInCart(): number {
        const items = [...this.getCardsData().values()];
        return items.filter((item) => item.inCart).length;
    }

    getFilterOptions(filterType: keyof CardData): FilterOption[] {
        const options = new Set<FilterOption>();

        this.getCardsData().forEach((item) => options.add(item[filterType]));

        return [...options];
    }

    getFilteredCardsData(query: SearchQuery): CardsData {
        const cardsDataCopy = new Map(this.getCardsData());

        for (const cardData of cardsDataCopy.values()) {
            let cardIsValid = true;

            for (const key of query.keys()) {
                const searchedValues = query.get(key) || [];

                const filterIsBlank = searchedValues.length === 0;
                if (filterIsBlank) continue;

                const fieldIsValid = searchedValues.includes(String(cardData[key]));
                if (!fieldIsValid) {
                    cardIsValid = false;
                }
            }

            if (!cardIsValid) cardsDataCopy.delete(cardData.id);
        }
        return cardsDataCopy;
    }
}
