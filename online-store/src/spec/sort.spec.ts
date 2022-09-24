import Sort from '../components/view/sort/sort';

describe('Sort', () => {
    const sort = new Sort();

    test('own element is created', () => {
        expect(sort.element instanceof HTMLElement).toBeTruthy();
    });

    test('select element is created', () => {
        expect(sort.selectElement instanceof HTMLSelectElement).toBeTruthy();
    });

    test('methods are present', () => {
        expect(typeof sort.setOption).toBe('function');
    });
});
