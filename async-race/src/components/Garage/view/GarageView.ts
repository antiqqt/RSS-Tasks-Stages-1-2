import BaseComponent from '../../common/BaseComponent/BaseComponent';
import Button from '../../common/Button/Button';
import CarUpdate from './CarUpdateField/CarUpdateField';
import ColorPicker from './ColorPIcker/ColorPicker';
import SearchBar from './SearchBar/SearchBar';
import {
  CarData,
  CarsData,
  CreateCarCallback,
  DeleteCarCallback,
  SelectCarCallback,
  SwitchPageCallback,
  UpdateCarCallback,
} from '../types';
import PageControls from './PageControls/PageControls';

export default class GarageView extends BaseComponent {
  private garageCounter: BaseComponent;

  private pageControls: BaseComponent;

  private currentPage: BaseComponent;

  private carUpdateField: CarUpdate;

  constructor(
    private onCreateCar: CreateCarCallback,
    private onSelectCar: SelectCarCallback,
    private onUpdateCar: UpdateCarCallback,
    private onDeleteCar: DeleteCarCallback,
    private onSwitchPage: SwitchPageCallback
  ) {
    super('main');
    this.setClass('flex flex-col min-h-screen px-3 text-slate-300 bg-slate-700');

    this.carUpdateField = new CarUpdate(this.onUpdateCar);
    this.garageCounter = new BaseComponent('p');
    this.pageControls = new PageControls(this.onSwitchPage);
    this.currentPage = new BaseComponent('div').setClass('flex-grow flex flex-col gap-y-6 pt-4 pb-6');

    this.renderHeader();
    this.renderRoutingBtns();
    this.renderGeneralSettings();
    this.renderPaginationSettings();
    this.currentPage.attachTo(this);
  }

  private renderHeader(): void {
    new BaseComponent('header')
      .setClass('pt-3 text-5xl font-bold tracking-wide')
      .setInnerText('Async Race')
      .attachTo(this);
  }

  private renderRoutingBtns(): void {
    const container = new BaseComponent('div').setClass('flex gap-x-2 pt-4').attachTo(this);

    new Button('garage', 'light').attachTo(container);
    new Button('winners', 'light').attachTo(container);
  }

  private renderGeneralSettings(): void {
    const container = new BaseComponent('div').setClass('flex flex-col gap-y-3 max-w-sm pt-8').attachTo(this);

    this.createCarCreateField().attachTo(container);
    this.carUpdateField.attachTo(container);

    this.createGeneralBtns().attachTo(container);
  }

  private createCarCreateField(): BaseComponent {
    const container = new BaseComponent('div').setClass('flex gap-x-4');

    const newCarName = new SearchBar().attachTo(container);
    const newCarColor = new ColorPicker().attachTo(container);
    new Button('create', 'dark')
      .setHandler('click', () =>
        this.onCreateCar({
          name: newCarName.getTextInput(),
          color: newCarColor.getColorInput(),
        })
      )
      .attachTo(container);

    return container;
  }

  private createGeneralBtns(): BaseComponent {
    const container = new BaseComponent('div').setClass('flex gap-x-3');

    new Button('race', 'light').attachTo(container);
    new Button('reset', 'light').attachTo(container);
    new Button('generate cars', 'dark').setClass('col-start-4 col-span-2').attachTo(container);

    return container;
  }

  private renderPaginationSettings(): void {
    const container = new BaseComponent('div').setClass('flex flex-col gap-y-2 pt-8').attachTo(this);

    this.garageCounter.setClass(['font-bold', 'text-2xl', 'capitalize']).attachTo(container);
    this.pageControls.attachTo(container);
  }

  private renderCarTrack({ name, color, id }: CarData): void {
    const container = new BaseComponent('div').setClass('flex flex-col gap-y-3').attachTo(this.currentPage);

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

    this.currentPage.clearInnerHTML();
    this.garageCounter.setInnerText(`Garage (${count})`);
    items.forEach((carData) => this.renderCarTrack(carData));
  }

  openСarUpdate(data: CarData): void {
    this.carUpdateField.open(data);
  }
}
