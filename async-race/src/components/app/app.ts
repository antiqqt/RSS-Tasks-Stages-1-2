import BaseComponent from '../common/BaseComponent/BaseComponent';
import Button from '../common/Button/Button';
import generateCarData from '../common/utils/generateCarData';
import Model from '../model/Model';
import { NewCarData, SwitchPageDirections, WinMessageData } from '../types';
import GarageView from '../view/Garage/GarageView';
import WinnersView from '../view/Winners/WinnersView';

export default class App {
  private routes: Record<string, BaseComponent>;

  private garageView: GarageView;

  private winnersView: WinnersView;

  private model: Model;

  private container: BaseComponent;

  activeView?: BaseComponent;

  constructor(root: HTMLElement | BaseComponent) {
    this.model = new Model();

    this.container = new BaseComponent('main')
      .setClass('flex flex-col xl:items-center min-h-screen px-2 text-slate-300 bg-slate-700')
      .attachTo(root);

    this.renderHeader();
    this.renderRoutingBtns();

    this.garageView = new GarageView(
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
    );

    this.winnersView = new WinnersView('section');

    this.routes = {
      garage: this.garageView,
      winners: this.winnersView,
    };

    this.handleRouteChange();
    window.onpopstate = (): void => this.handleRouteChange();
  }

  private handleRouteChange(): void {
    const hash = window.location.hash.slice(1).toLowerCase();

    const targetPage = hash in this.routes ? this.routes[hash] : this.routes.garage;
    if (targetPage === this.activeView) return;

    if (this.activeView) this.activeView.remove();
    this.activeView = targetPage;
    this.activeView.attachTo(this.container);
  }

  private renderHeader(): void {
    new BaseComponent('header')
      .setClass('pt-3 text-5xl font-bold tracking-wide')
      .setInnerText('Async Race')
      .attachTo(this.container);
  }

  private renderRoutingBtns(): void {
    const container = new BaseComponent('div').setClass('flex gap-x-2 pt-4').attachTo(this.container);

    new Button('garage', 'light').attachTo(container).setHandler('click', () => {
      window.location.href = '#garage';
    });

    new Button('winners', 'light').attachTo(container).setHandler('click', () => {
      window.location.href = '#winners';
    });
  }

  private renderGaragePage(): void {
    this.model.getCars().then((carsData) => {
      this.garageView.renderPage(carsData);

      const CARS_PER_PAGE = 7;
      const MIN_PAGE_INDEX = 1;

      const nextPageExists = Number(carsData.count) > this.model.getCurrentPage() * CARS_PER_PAGE;
      const prevPageExists = this.model.getCurrentPage() > MIN_PAGE_INDEX;

      if (nextPageExists) {
        this.garageView.enableNextPageBtn();
      } else {
        this.garageView.disableNextPageBtn();
      }

      if (prevPageExists) {
        this.garageView.enablePrevPageBtn();
      } else {
        this.garageView.disablePrevPageBtn();
      }
    });
  }

  private selectCarCallback = (id: number): void => {
    this.model.getCar(id).then((data) => this.garageView.openСarUpdate(data));
  };

  private updateCarCallback = (id: number, body: NewCarData): void => {
    this.model.updateCar(id, body).then(() => this.renderGaragePage());
  };

  private createCarCallback = (data: NewCarData): void => {
    this.model.createCar(data).then(() => this.renderGaragePage());
  };

  private deleteCarCallback = (id: number): void => {
    this.model.deleteCar(id).then(() => {
      const currentlyUpgradedCarID = this.garageView.carUpdateField.getOpenedCarId();

      if (currentlyUpgradedCarID && currentlyUpgradedCarID === id) {
        this.garageView.carUpdateField.writingModeOff();
      }

      this.renderGaragePage();
    });
  };

  private generateCarsCallback = (numberOfNewCars = 100): void => {
    const randomCarsData = new Array(numberOfNewCars).fill('').map(() => {
      const newCarData = generateCarData();

      return this.model.createCar(newCarData);
    });

    Promise.all(randomCarsData).then(() => this.renderGaragePage());
  };

  private driveCarCallback = (id: number, name: string): Promise<WinMessageData> =>
    this.model.startEngine(id).then((carInfo) => {
      const duration = carInfo.distance / carInfo.velocity;

      this.garageView.doDriveCarAnimation(id, duration);
      const animationStartTimer = Date.now();

      // Return new promise which will resolve after N ms
      // to make this method compatible with Promise.race();
      return new Promise<WinMessageData>((resolve) => {
        this.model.switchEngine(id).then((response) => {
          if (!response.success) this.garageView.doBreakCarAnimation(id);

          const timeDiff = Date.now() - animationStartTimer;
          if (response.success) setTimeout(() => resolve([name, duration]), duration - timeDiff);
        });
      });
    });

  private stopCarCallback = (id: number): void => {
    this.model.stopEngine(id).then(() => this.garageView.doStopCarAnimation(id));
  };

  private startRaceCallback = (): void => {
    const competingCars = this.garageView.getCarTracksArray().map((car) => car.drive());

    this.garageView.raceModeOn();

    Promise.race(competingCars).then((data) => {
      this.garageView.openWinMessage(data);
      this.garageView.raceModeOff();
    });
  };

  private resetRaceCallback = (): void => {
    this.garageView.getCarTracksArray().forEach((car) => car.stop());
  };

  private switchPageCallback = (direction: SwitchPageDirections): Promise<number> =>
    this.model.switchCurrentPage(direction).finally(() => this.renderGaragePage());

  start(): void {
    this.renderGaragePage();
  }
}
