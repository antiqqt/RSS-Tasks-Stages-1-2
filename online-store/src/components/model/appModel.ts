import {
    CardsData,
    CardsDataAsObj,
    DataStorage,
    FilterStateAsObj,
    LocalData,
    SearchQuery,
    SortField,
    SortFieldType,
} from '../../types';
import DB from '../../assets/data/data.json';

export default class Model implements DataStorage {
    private filterState: SearchQuery;
    private cardsState: CardsData;
    private sortState: [SortField, SortFieldType];
    private searchState: string | null;

    constructor() {
        const data = localStorage.getItem('antiqqt-store-state');

        if (data) {
            const parsedData = JSON.parse(data) as LocalData;

            this.sortState = parsedData.sortState;
            this.filterState = new Map(Object.entries(parsedData.filterState)) as SearchQuery;
            this.cardsState = new Map(Object.entries(parsedData.cardsState));
            this.searchState = parsedData.searchState;
        } else {
            this.sortState = ['type', 'a'];
            this.filterState = new Map();
            this.cardsState = new Map(Object.entries(DB));
            this.searchState = null;
        }

        window.addEventListener('unload', () => {
            const currentCardsState = Object.fromEntries(this.cardsState) as CardsDataAsObj;
            const currentFilterState = Object.fromEntries(this.filterState) as FilterStateAsObj;
            const currentSearchState = this.searchState;

            const savedState: LocalData = {
                sortState: this.sortState,
                filterState: currentFilterState,
                cardsState: currentCardsState,
                searchState: currentSearchState,
            };

            localStorage.setItem('antiqqt-store-state', JSON.stringify(savedState));
        });
    }

    public saveFilterState(newState: SearchQuery): void {
        this.filterState = newState;
    }

    public getFilterState(): SearchQuery {
        return this.filterState;
    }

    public getCardsData(): CardsData {
        return this.cardsState;
    }

    public saveSortState(currentSortState: [SortField, SortFieldType]): void {
        this.sortState = currentSortState;
    }

    public getSavedSortState(): [SortField, SortFieldType] {
        return this.sortState;
    }

    public clearCart(): void {
        this.cardsState.forEach((cardData) => {
            cardData.inCart = false;
        });
    }

    public saveSearchState(currentSearchState: string | null): void {
        this.searchState = currentSearchState;
    }

    public getSavedSearchState(): string | null {
        return this.searchState;
    }
}
