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
  DriveCarCallback,
  GenerateCarsCallback,
  SelectCarCallback,
  SwitchPageCallback,
  UpdateCarCallback,
} from '../types';
import Pagination from './Pagination/Pagination';

export default class GarageView extends BaseComponent {
  private pagination: Pagination;

  private carUpdateField: CarUpdate;

  constructor(
    private onCreateCar: CreateCarCallback,
    private onSelectCar: SelectCarCallback,
    private onUpdateCar: UpdateCarCallback,
    private onDeleteCar: DeleteCarCallback,
    private onSwitchPage: SwitchPageCallback,
    private onGenerateCars: GenerateCarsCallback,
    private onDriveCar: DriveCarCallback
  ) {
    super('main');
    this.setClass('flex flex-col xl:items-center xl:min-w-full min-h-screen px-3 text-slate-300 bg-slate-700');

    this.carUpdateField = new CarUpdate(this.onUpdateCar);
    this.pagination = new Pagination(this.onSwitchPage, this.onSelectCar, this.onDeleteCar, this.onDriveCar);

    this.renderHeader();
    this.renderRoutingBtns();
    this.renderGeneralSettings();
    this.pagination.attachTo(this);
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
    new Button('generate cars', 'dark')
      .setClass('col-start-4 col-span-2')
      .attachTo(container)
      .setHandler('click', () => this.onGenerateCars());

    return container;
  }

  renderPage(data: CarsData): void {
    this.pagination.renderPage(data);
  }

  openСarUpdate(data: CarData): void {
    this.carUpdateField.open(data);
  }

  disableNextPageBtn(): void {
    this.pagination.disableNextBtn();
  }

  enableNextPageBtn(): void {
    this.pagination.enableNextBtn();
  }

  disablePrevPageBtn(): void {
    this.pagination.disablePrevBtn();
  }

  enablePrevPageBtn(): void {
    this.pagination.enablePrevBtn();
  }

  driveCar(id: number, duration: number): void {
    const car = this.pagination.getCarTracks().get(id);
    if (!car) throw new Error(`No car with this id: ${id}`);

    car.drive(duration);
  }

  stopCar(id: number): void {
    const car = this.pagination.getCarTracks().get(id);
    if (!car) throw new Error(`No car with this id: ${id}`);

    car.stop();
  }
}
