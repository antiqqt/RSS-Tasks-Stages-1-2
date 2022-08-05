import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import Button from '../../../common/Button/Button';
import {
  CarData,
  DeleteCarCallback,
  DriveCarCallback,
  SelectCarCallback,
  StopCarCallback,
  WinMessageData,
} from '../../types';

const keyframe = [{ left: '2%' }, { left: '91%' }];

const getKeyframeOptions = (duration: number): KeyframeAnimationOptions => ({
  fill: 'forwards',
  duration,
});

export default class CarTrack extends BaseComponent {
  private carElement: BaseComponent;

  private carAnimation: Animation | undefined;

  private driveBtn: Button;

  private stopBtn: Button;

  constructor(
    public carData: CarData,
    private onSelectCar: SelectCarCallback,
    private onDeleteCar: DeleteCarCallback,
    private onDriveCar: DriveCarCallback,
    private onStopCar: StopCarCallback
  ) {
    super('div');
    this.setClass('flex flex-col gap-y-3');

    this.carElement = new BaseComponent('div');
    this.driveBtn = new Button('A', 'dark');
    this.stopBtn = new Button('B', 'dark');

    this.createTrackControls(this.carData.name, this.carData.id).attachTo(this);
    this.createCarTrack().attachTo(this.createEngineControls().attachTo(this));
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

    this.driveBtn
      .attachTo(container)
      .removeClass('bg-indigo-200 w-max')
      .setClass('w-6 h-6 bg-emerald-200 rounded-full')
      .setHandler('click', () => {
        if (this.driveBtn.getStatus() === 'disabled') return;

        this.driveModeOn();
        this.onDriveCar(this.carData.id, this.carData.name);
      });

    this.stopBtn
      .attachTo(container)
      .removeClass('bg-indigo-200 w-max')
      .setClass('w-6 h-6 bg-emerald-200 rounded-full')
      .disable()
      .setHandler('click', () => {
        if (this.stopBtn.getStatus() === 'disabled') return;

        this.driveModeOff();
        this.onStopCar(this.carData.id);
      });

    return container;
  }

  private createCarTrack(): BaseComponent {
    const container = new BaseComponent('div').setClass(
      'relative flex-grow flex max-w-[90rem] h-8 ml-3 bg-slate-400 rounded'
    );

    this.carElement
      .setClass('w-8 h-8 absolute left-[2%]')
      .setInnerHTML(
        ` <svg class="w-full h-full rotate-90" style="fill: ${this.carData.color};">
          <use xlink:href="#car-top-view"></use>
        </svg>`
      )
      .attachTo(container);

    new BaseComponent('div')
      .setClass('absolute right-[9%] w-8 h-8')
      .setInnerHTML(
        ` <svg class="w-full h-full stroke-indigo-100 fill-indigo-100 rotate-90">
          <use xlink:href="#finish-line"></use>
        </svg>`
      )
      .attachTo(container);

    return container;
  }

  doDriveAnimation(duration: number): void {
    if (this.carAnimation) this.carAnimation.cancel();

    this.carAnimation = this.carElement.animate(keyframe, getKeyframeOptions(duration));
  }

  doBreakAnimation(): void {
    if (!this.carAnimation) return;

    this.carAnimation.pause();
  }

  doStopAnimation(): void {
    if (!this.carAnimation) return;

    this.carAnimation.cancel();
  }

  private driveModeOn(): void {
    this.driveBtn.disable();
    this.stopBtn.enable();
  }

  private driveModeOff(): void {
    this.driveBtn.enable();
    this.stopBtn.disable();
  }

  drive(): Promise<WinMessageData> {
    this.driveModeOn();

    return this.onDriveCar(this.carData.id, this.carData.name);
  }

  stop(): void {
    this.driveModeOff();
    this.onStopCar(this.carData.id);
  }
}
