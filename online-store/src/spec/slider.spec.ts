import Slider from '../components/view/filters/slider/slider';

describe('Slider', () => {
    const defaultYearOptions = ['2015.00', '2022.00'];
    const defaultQuantityOptions = ['1.00', '13.00'];

    const yearSlider = new Slider('year');
    const quantitySlider = new Slider('quantity');

    test('own element is created', () => {
        expect(yearSlider.element instanceof HTMLElement).toBeTruthy();
        expect(quantitySlider.element instanceof HTMLElement).toBeTruthy();
    });

    test('default options are set correctly', () => {
        expect(yearSlider.getChosenOptions()).toEqual(defaultYearOptions);
        expect(quantitySlider.getChosenOptions()).toEqual(defaultQuantityOptions);
    });
});
