import Filter from '../components/view/filters/filter/filter';
import { CardData, FilterOption } from '../types';

describe('default Filter test', () => {
    const defaultType: keyof CardData = 'type';
    const defaultOptions: FilterOption[] = [];
    const defaultChosenOptions: string[] = [];

    const filter = new Filter(defaultType, defaultOptions);

    test('own element is created', () => {
        expect(filter.element instanceof HTMLElement).toBeTruthy();
    });

    test('default type is set correctly', () => {
        expect(filter.type).toBe(defaultType);
    });

    test('default chosen options are present', () => {
        expect(filter.getChosenOptions()).toEqual(defaultChosenOptions);
    });
});

describe('arbitraty Filter test', () => {
    const arbitraryType: keyof CardData = 'pattern';
    const arbitraryOptions: FilterOption[] = [];

    const filter = new Filter(arbitraryType, arbitraryOptions);

    test('own element is created', () => {
        expect(filter.element instanceof HTMLElement).toBeTruthy();
    });

    test('type is set correctly', () => {
        expect(filter.type).toBe(arbitraryType);
    });
});
