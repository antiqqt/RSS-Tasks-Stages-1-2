import BaseComponent from '../common/BaseComponent/BaseComponent';
import GarageModel from './GarageModel';
import GarageView from './view/GarageView';
import { NewCarData, SwitchPageDirections, WinMessageData } from './types';
import generateCarData from '../common/utils/generateCarData';

export default class GarageController {
  private view: GarageView;

  private model: GarageModel;

  constructor(container: HTMLElement | BaseComponent) {
    this.model = new GarageModel();

    this.view = new GarageView(
      this.createCarCallback,
      this.selectCarCallback,
      this.updateCarCallback,
      this.deleteCarCallback,
      this.switchPageCallback,
      this.generateCarsCallback,
      this.driveCarCallback,
      this.stopCarCallback,
      this.startRaceCallback,
      this.resetRaceCallback
    ).attachTo(container);

    this.start();
  }

  private renderPage(): void {
    this.model.getCars().then((carsData) => {
      this.view.renderPage(carsData);

      const CARS_PER_PAGE = 7;
      const MIN_PAGE_INDEX = 1;

      const nextPageExists = Number(carsData.count) > this.model.getCurrentPage() * CARS_PER_PAGE;
      const prevPageExists = this.model.getCurrentPage() > MIN_PAGE_INDEX;

      if (nextPageExists) {
        this.view.enableNextPageBtn();
      } else {
        this.view.disableNextPageBtn();
      }

      if (prevPageExists) {
        this.view.enablePrevPageBtn();
      } else {
        this.view.disablePrevPageBtn();
      }
    });
  }

  private selectCarCallback = (id: number): void => {
    this.model.getCar(id).then((data) => this.view.openСarUpdate(data));
  };

  private updateCarCallback = (id: number, body: NewCarData): void => {
    this.model.updateCar(id, body).then(() => this.renderPage());
  };

  private createCarCallback = (data: NewCarData): void => {
    this.model.createCar(data).then(() => this.renderPage());
  };

  private deleteCarCallback = (id: number): void => {
    this.model.deleteCar(id).then(() => this.renderPage());
  };

  private generateCarsCallback = (numberOfNewCars = 100): void => {
    const randomCarsData = new Array(numberOfNewCars).fill('').map(() => {
      const newCarData = generateCarData();

      return this.model.createCar(newCarData);
    });

    Promise.all(randomCarsData).then(() => this.renderPage());
  };

  private driveCarCallback = (id: number, name: string): Promise<WinMessageData> =>
    this.model.startEngine(id).then((carInfo) => {
      const duration = carInfo.distance / carInfo.velocity;

      this.view.raceModeOn();
      this.view.doDriveCarAnimation(id, duration);
      const animationStartTimer = Date.now();

      // Return new promise which will resolve after N ms
      // to make this method compatible with Promise.race();
      return new Promise<WinMessageData>((resolve) => {
        this.model.switchEngine(id).then((response) => {
          if (!response.success) this.view.doBreakCarAnimation(id);

          const timeDiff = Date.now() - animationStartTimer;
          if (response.success) setTimeout(() => resolve([name, duration]), duration - timeDiff);
        });
      });
    });

  private stopCarCallback = (id: number): void => {
    this.model.stopEngine(id).then(() => this.view.doStopCarAnimation(id));
  };

  private startRaceCallback = (): void => {
    const competingCars = this.view.getCarTracksArray().map((car) => car.drive());

    Promise.race(competingCars).then((data) => {
      this.view.openWinMessage(data);
      this.view.raceModeOff();
    });
  };

  private resetRaceCallback = (): void => {
    this.view.getCarTracksArray().forEach((car) => car.stop());
  };

  private switchPageCallback = (direction: SwitchPageDirections): Promise<number> =>
    this.model.switchCurrentPage(direction).finally(() => this.renderPage());

  start(): void {
    this.renderPage();
  }
}
