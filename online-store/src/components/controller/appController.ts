import { CardData, CardsData, Errors, FilterOption, SearchQuery, SortField, SortFieldType } from '../../types';
import Model from '../model/appModel';

export default class Controller {
    private model: Model;

    constructor() {
        this.model = new Model();
    }

    public getCardsData(): CardsData {
        return this.model.getCardsData();
    }

    public checkInCart(id: string): boolean {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        return data.inCart;
    }

    public addToCart(id: string): void {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        data.inCart = true;
    }

    public removeFromCart(id: string): void {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        data.inCart = false;
    }

    public getNumOfItemsInCart(): number {
        const items = [...this.getCardsData().values()];
        return items.filter((item) => item.inCart).length;
    }

    public getFilterOptions(filterType: keyof CardData): FilterOption[] {
        const options = new Set<FilterOption>();

        this.getCardsData().forEach((item) => options.add(item[filterType]));

        return [...options];
    }

    public getFilteredCardsData(query: SearchQuery): CardsData {
        this.model.saveFilterState(query);
        const cardsDataCopy = new Map(this.getCardsData());

        for (const cardData of cardsDataCopy.values()) {
            let cardIsValid = true;

            for (const key of query.keys()) {
                let fieldIsValid: boolean;
                const searchedValues = query.get(key) || [];

                const filterIsBlank = searchedValues.length === 0;
                if (filterIsBlank) continue;

                if (key === 'quantity' || key === 'year') {
                    const [from, to] = searchedValues.map(Number);
                    const fieldValAsNumber = Number.parseInt(cardData[key]);
                    fieldIsValid = fieldValAsNumber >= from && fieldValAsNumber <= to;
                } else {
                    fieldIsValid = searchedValues.includes(String(cardData[key]));
                }

                if (!fieldIsValid) cardIsValid = false;
            }

            if (!cardIsValid) cardsDataCopy.delete(cardData.id);
        }
        return cardsDataCopy;
    }

    public getSavedFilterState(): SearchQuery {
        return this.model.getFilterState();
    }

    public saveSortState(sortOrder: [SortField, SortFieldType]): void {
        return this.model.saveSortState(sortOrder);
    }

    public getSavedSortState(): [SortField, SortFieldType] {
        return this.model.getSavedSortState();
    }

    public clearCart(): void {
        this.model.clearCart();
    }
}
