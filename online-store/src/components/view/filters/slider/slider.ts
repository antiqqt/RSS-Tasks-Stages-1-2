import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css';

type API = noUiSlider.API;
type EventCallback = (
    this: API,
    values: (number | string)[],
    handleNumber: number,
    unencoded: number[],
    tap: boolean,
    locations: number[],
    slider: API
) => void;

export default class Slider {
    readonly element: HTMLDivElement;
    private slider: noUiSlider.target;
    readonly type: 'quantity' | 'year';

    constructor(type: 'quantity' | 'year') {
        this.type = type;
        this.element = document.createElement('div');
        this.constructOwnElement();

        this.slider = document.createElement('div');
        this.constructSlider(type);

        this.element.append(this.slider);
    }

    private constructOwnElement(): void {
        const header = document.createElement('h4');
        header.innerText = this.type;
        header.classList.add('w-full', 'mb-3', 'font-medium', 'text-md', 'text-neutral-600', 'capitalize');

        this.element.classList.add('flex', 'flex-col', 'items-center', 'mb-7');
        this.element.append(header);
    }

    private constructSlider(type: typeof this.type): void {
        const [from, to] = type === 'quantity' ? [1, 13] : [2015, 2022];

        const formatter = {
            to(val: number): number {
                return parseInt(String(val));
            },
        };

        noUiSlider.create(this.slider, {
            start: [from, to],
            connect: true,
            step: 1,
            tooltips: [formatter, formatter],
            range: {
                min: from,
                max: to,
            },
        });

        this.slider.classList.add('flex', 'jusify-center', 'w-32', 'h-2');
    }

    public getChosenOptions(): string[] {
        const chosenOptions = this.slider.noUiSlider?.get() as string[];

        return chosenOptions;
    }

    public onChange(handler: EventCallback): void {
        this.slider.noUiSlider?.on('change', handler);
    }

    public reset(): void {
        this.slider.noUiSlider?.reset();
    }

    public setSavedOptions(savedRange: string[]): void {
        const savedRangeAsNumbers = savedRange.map(Number);

        this.slider.noUiSlider?.set(savedRangeAsNumbers);
    }
}
