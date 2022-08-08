import BaseComponent from '../../common/BaseComponent/BaseComponent';
import Button from '../../common/Button/Button';
import {
  CarData,
  CarsData,
  CreateCarCallback,
  DeleteCarCallback,
  DriveCarCallback,
  GenerateCarsCallback,
  RaceCallback,
  SelectCarCallback,
  StopCarCallback,
  SwitchPageCallback,
  UpdateCarCallback,
} from '../../types';
import CarTrack from './CarTrack/CarTrack.';
import CarUpdateField from './CarUpdateField/CarUpdateField';
import ColorPicker from './ColorPIcker/ColorPicker';
import Pagination from './Pagination/Pagination';
import SearchBar from './SearchBar/SearchBar';
import WinMessage from './WinMessage/WinMessage';

export default class GarageView extends BaseComponent {
  private pagination: Pagination;

  private winMessage: WinMessage;

  public carUpdateField: CarUpdateField;

  private raceBtn: Button;

  private resetBtn: Button;

  constructor(
    private onCreateCar: CreateCarCallback,
    private onSelectCar: SelectCarCallback,
    private onUpdateCar: UpdateCarCallback,
    private onDeleteCar: DeleteCarCallback,
    private onSwitchPage: SwitchPageCallback,
    private onGenerateCars: GenerateCarsCallback,
    private onDriveCar: DriveCarCallback,
    private onStopCar: StopCarCallback,
    private onStartRace: RaceCallback,
    private onResetRace: RaceCallback
  ) {
    super('section');
    this.setClass('self-stretch flex flex-col xl:items-center xl:min-w-full');

    this.carUpdateField = new CarUpdateField(this.onUpdateCar);

    this.raceBtn = new Button('race', 'light');
    this.resetBtn = new Button('reset', 'light');

    this.pagination = new Pagination(
      this.onSwitchPage,
      this.onSelectCar,
      this.onDeleteCar,
      this.onDriveCar,
      this.onStopCar
    );

    this.winMessage = new WinMessage();

    this.renderGeneralSettings();
    this.pagination.attachTo(this);
    this.winMessage.attachTo(this);
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

    this.raceBtn.attachTo(container).setHandler('click', () => {
      if (this.raceBtn.getStatus() === 'disabled') return;

      this.onStartRace();
    });

    this.resetBtn
      .attachTo(container)
      .disable()
      .setHandler('click', () => {
        if (this.resetBtn.getStatus() === 'disabled') return;

        this.onResetRace();
        this.resetBtn.disable();

        setTimeout(() => this.raceBtn.enable(), 2500);
      });

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

  doDriveCarAnimation(id: number, duration: number): void {
    const car = this.pagination.getCarTracks().get(id);
    if (!car) throw new Error(`No car with this id: ${id}`);

    car.doDriveAnimation(duration);
  }

  doBreakCarAnimation(id: number): void {
    const car = this.pagination.getCarTracks().get(id);
    if (!car) throw new Error(`No car with this id: ${id}`);

    car.doBreakAnimation();
  }

  doStopCarAnimation(id: number): void {
    const car = this.pagination.getCarTracks().get(id);
    if (!car) throw new Error(`No car with this id: ${id}`);

    car.doStopAnimation();
  }

  getCarTracksArray(): CarTrack[] {
    return [...this.pagination.getCarTracks()].map(([, track]) => track);
  }

  openWinMessage(carName?: string, time?: number): void {
    return this.winMessage.open(carName, time);
  }

  raceModeOn(): void {
    this.raceBtn.disable();
    this.resetBtn.disable();
  }

  raceModeOff(): void {
    this.resetBtn.enable();
  }
}
