export interface CardData {
    type: string;
    color: string;
    pattern: string;
    price: string;
    quantity: string;
    releaseYear: string;
    manufacturer: string;
    imageLink: string;
    id: string;
    inCart: boolean;
}

export type CardsData = Map<string, CardData>;

export enum Errors {
    InvalidID = 'Invalid item id',
}

export type SortField = 'price' | 'type';

export type SortFieldType = 'a' | 'z' | 'lowest' | 'highest';

export type FilterOption = CardData[keyof CardData];

export type SearchQuery = Map<keyof CardData, string[]>;
