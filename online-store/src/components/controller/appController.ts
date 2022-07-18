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

    public getFilteredCardsData(filterQuery: SearchQuery, searchBarQuery: string | null): CardsData {
        this.model.saveFilterState(filterQuery);
        const cardsDataCopy = new Map(this.getCardsData());

        for (const cardData of cardsDataCopy.values()) {
            let cardIsValid = true;

            if (searchBarQuery != null) {
                cardIsValid = (Object.entries(cardData) as Array<[keyof CardData, CardData[keyof CardData]]>).some(
                    ([key, cardVal]) => {
                        if (['id', 'imageLink'].includes(key)) return false;
                        if (typeof cardVal === 'boolean') return false;

                        return cardVal.includes(searchBarQuery.toLowerCase());
                    }
                );
            }

            for (const key of filterQuery.keys()) {
                let fieldIsValid: boolean;
                const searchedValues = filterQuery.get(key) || [];

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

    public saveSearchBarState(currentSearchState: string | null): void {
        this.model.saveSearchState(currentSearchState);
    }

    public getSavedSearchBarState(): string | null {
        return this.model.getSavedSearchState();
    }
}
