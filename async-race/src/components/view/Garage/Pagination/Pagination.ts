import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import Button from '../../../common/Button/Button';
import {
  CarsData,
  DeleteCarCallback,
  DriveCarCallback,
  SelectCarCallback,
  StopCarCallback,
  SwitchPageCallback,
  SwitchPageDirections,
} from '../../../types';
import CarTrack from '../CarTrack/CarTrack.';

export default class Pagination extends BaseComponent {
  private garageCounter: BaseComponent;

  private pageCounter: BaseComponent;

  private pageElement: BaseComponent;

  private nextBtn: Button;

  private prevBtn: Button;

  private carTracks: Map<number, CarTrack> = new Map();

  constructor(
    private onSwitchPage: SwitchPageCallback,
    private onSelectCar: SelectCarCallback,
    private onDeleteCar: DeleteCarCallback,
    private onDriveCar: DriveCarCallback,
    private onStopCar: StopCarCallback
  ) {
    super('div');
    this.setClass('flex flex-col xl:w-5/6 gap-y-2 pt-8');

    this.garageCounter = new BaseComponent('p').setClass(['font-bold', 'text-2xl', 'capitalize']).attachTo(this);

    this.pageCounter = new BaseComponent('p')
      .setClass(['font-semibold', 'text-lg', 'capitalize'])
      .setInnerText('Page #1');

    this.prevBtn = new Button('prev', 'dark');
    this.nextBtn = new Button('next', 'dark');

    this.createPageControls().attachTo(this);

    this.pageElement = new BaseComponent('div').setClass('flex-grow flex flex-col gap-y-6 pt-4 pb-6').attachTo(this);
  }

  private createPageControls(): BaseComponent {
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

  renderPage({ items, count }: CarsData): void {
    this.pageElement.clearInnerHTML();
    this.garageCounter.setInnerText(`Garage (${count})`);
    this.carTracks.clear();

    items.forEach((carData) => {
      const newTrack = new CarTrack(carData, this.onSelectCar, this.onDeleteCar, this.onDriveCar, this.onStopCar);

      this.carTracks.set(newTrack.carData.id, newTrack);
      newTrack.attachTo(this.pageElement);
    });
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

  getCarTracks(): Map<number, CarTrack> {
    return this.carTracks;
  }
}
