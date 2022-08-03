import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import Button from '../../../common/Button/Button';
import {
  CarData,
  CarsData,
  DeleteCarCallback,
  SelectCarCallback,
  SwitchPageCallback,
  SwitchPageDirections,
} from '../../types';

export default class Pagination extends BaseComponent {
  private garageCounter: BaseComponent;

  private pageCounter: BaseComponent;

  private pageElement: BaseComponent;

  private nextBtn: Button;

  private prevBtn: Button;

  constructor(
    private onSwitchPage: SwitchPageCallback,
    private onSelectCar: SelectCarCallback,
    private onDeleteCar: DeleteCarCallback
  ) {
    super('div');
    this.setClass('flex flex-col gap-y-2 pt-8');

    this.garageCounter = new BaseComponent('p').setClass(['font-bold', 'text-2xl', 'capitalize']).attachTo(this);

    this.pageCounter = new BaseComponent('p')
      .setClass(['font-semibold', 'text-lg', 'capitalize'])
      .setInnerText('Page #1');

    this.prevBtn = new Button('prev', 'dark');
    this.nextBtn = new Button('next', 'dark');

    this.renderPageControls().attachTo(this);

    this.pageElement = new BaseComponent('div').setClass('flex-grow flex flex-col gap-y-6 pt-4 pb-6').attachTo(this);
  }

  private renderPageControls(): BaseComponent {
    const container = new BaseComponent('div').setClass('flex items-center gap-x-3');

    this.pageCounter.attachTo(container);

    this.prevBtn
      .attachTo(container)
      .disable()
      .setHandler('click', () => {
        if (this.prevBtn.getStatus() === 'disabled') return;

        this.onSwitchPage(SwitchPageDirections.PREV).then((currPageIndex) => this.setPageCounter(currPageIndex));
      });

    this.nextBtn
      .attachTo(container)
      .disable()
      .setHandler('click', () => {
        if (this.nextBtn.getStatus() === 'disabled') return;

        this.onSwitchPage(SwitchPageDirections.NEXT).then((currPageIndex) => this.setPageCounter(currPageIndex));
      });

    return container;
  }

  private renderCarTrack({ name, color, id }: CarData): void {
    const container = new BaseComponent('div').setClass('flex flex-col gap-y-3').attachTo(this.pageElement);

    this.createTrackControls(name, id).attachTo(container);
    this.createCarTrack(color).attachTo(this.createEngineControls().attachTo(container));
  }

  private createTrackControls(carName: string, carID: number): BaseComponent {
    const container = new BaseComponent('div').setClass('flex gap-x-2');

    new Button('select', 'light').setHandler('click', () => this.onSelectCar(carID)).attachTo(container);

    new Button('remove', 'light').setHandler('click', () => this.onDeleteCar(carID)).attachTo(container);

    new BaseComponent('div').setClass('ml-2 font-semibold text-md').setInnerText(carName).attachTo(container);

    return container;
  }

  private createEngineControls(): BaseComponent {
    const container = new BaseComponent('div').setClass('flex items-center gap-x-2');

    new Button('A', 'dark')
      .removeClass('bg-indigo-200 w-max')
      .setClass('w-6 h-6 bg-emerald-200 rounded-full')
      .attachTo(container);

    new Button('B', 'dark')
      .removeClass('bg-indigo-200 w-max')
      .setClass('w-6 h-6 bg-emerald-200 rounded-full')
      .attachTo(container);

    return container;
  }

  private createCarTrack(color: string): BaseComponent {
    const container = new BaseComponent('div').setClass('relative flex-grow flex ml-3 pl-3 bg-slate-400 rounded');

    new BaseComponent('div')
      .setClass('w-8 h-8')
      .setInnerHTML(
        ` <svg class="w-full h-full rotate-90" style="fill: ${color};">
          <use xlink:href="#car-top-view"></use>
        </svg>`
      )
      .attachTo(container);

    new BaseComponent('div')
      .setClass('absolute right-12 w-8 h-8')
      .setInnerHTML(
        ` <svg class="w-full h-full stroke-indigo-100 fill-indigo-100 rotate-90">
          <use xlink:href="#finish-line"></use>
        </svg>`
      )
      .attachTo(container);

    return container;
  }

  renderPage({ items, count }: CarsData): void {
    console.log(items, count);

    this.pageElement.clearInnerHTML();
    this.garageCounter.setInnerText(`Garage (${count})`);
    items.forEach((carData) => this.renderCarTrack(carData));
  }

  setPageCounter(pageIndex: number): void {
    this.pageCounter.setInnerText(`Page #${pageIndex}`);
  }

  disableNextBtn(): void {
    this.nextBtn.disable();
  }

  enableNextBtn(): void {
    this.nextBtn.enable();
  }

  disablePrevBtn(): void {
    this.prevBtn.disable();
  }

  enablePrevBtn(): void {
    this.prevBtn.enable();
  }
}
