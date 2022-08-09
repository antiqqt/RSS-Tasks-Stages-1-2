import BaseComponent from '../common/BaseComponent/BaseComponent';
import Button from '../common/Button/Button';
import generateCarData from '../common/utils/generateCarData';
import Model from '../model/Model';
import { CarData, NewCarData, RaceWinnerData, SortOrder, SwitchPageDirections } from '../types';
import GarageView from '../view/Garage/GarageView';
import WinnersView from '../view/Winners/WinnersView';

const CARS_PER_PAGE = 7;
const WINNERS_PER_PAGE = 10;
const MIN_PAGE_INDEX = 1;

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
      this.switchGaragePageCallback,
      this.generateCarsCallback,
      this.driveCarCallback,
      this.stopCarCallback,
      this.startRaceCallback,
      this.resetRaceCallback
    );

    this.winnersView = new WinnersView(this.getCarCallback, this.switchWinnersPageCallback, this.sortWinnersCallback);

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
    this.model.getCars().then((data) => {
      this.garageView.renderPage(data);

      const nextPageExists = Number(data.count) > this.model.getCurrentGaragePage() * CARS_PER_PAGE;
      const prevPageExists = this.model.getCurrentGaragePage() > MIN_PAGE_INDEX;

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

  private renderWinnersPage(): void {
    this.model.getWinners().then((data) => {
      this.winnersView.renderPage(data, this.model.getCurrentWinnersPage());

      const nextPageExists = Number(data.count) > this.model.getCurrentWinnersPage() * WINNERS_PER_PAGE;
      const prevPageExists = this.model.getCurrentWinnersPage() > MIN_PAGE_INDEX;

      if (nextPageExists) {
        this.winnersView.enableNextPageBtn();
      } else {
        this.winnersView.disableNextPageBtn();
      }

      if (prevPageExists) {
        this.winnersView.enablePrevPageBtn();
      } else {
        this.winnersView.disablePrevPageBtn();
      }
    });
  }

  private getCarCallback = (id: number): Promise<CarData> => this.model.getCar(id);

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

    this.model.deleteWinner(id).then((isUpdateNeeded) => {
      if (isUpdateNeeded) this.renderWinnersPage();
    });
  };

  private generateCarsCallback = (numberOfNewCars = 100): void => {
    const randomCarsData = new Array(numberOfNewCars).fill('').map(() => {
      const newCarData = generateCarData();

      return this.model.createCar(newCarData);
    });

    Promise.all(randomCarsData).then(() => this.renderGaragePage());
  };

  private driveCarCallback = (id: number, name: string): Promise<RaceWinnerData> =>
    this.model.startEngine(id).then((carInfo) => {
      const duration = carInfo.distance / carInfo.velocity;

      this.garageView.doDriveCarAnimation(id, duration);

      // Return new promise which will resolve after N ms
      // to make this method compatible with Promise.race();
      return new Promise<RaceWinnerData>((resolve, reject) => {
        this.model.switchEngine(id).then((response) => {
          if (!response.success) {
            this.garageView.doBreakCarAnimation(id);
            reject(new Error('Engine broke'));
          } else {
            resolve({ name, id, duration });
          }
        });
      });
    });

  private stopCarCallback = (id: number): void => {
    this.model.stopEngine(id).then(() => this.garageView.doStopCarAnimation(id));
  };

  private startRaceCallback = (): void => {
    const competingCars = this.garageView.getCarTracksArray().map((car) => car.drive());
    this.garageView.raceModeOn();

    Promise.any(competingCars)
      .then(({ id, name, duration }) => {
        const durationAsDate = new Date(duration);
        const sec = durationAsDate.getUTCSeconds();
        const ms = durationAsDate.getUTCMilliseconds();
        const time = parseFloat(`${sec}.${ms}`);

        this.garageView.raceModeOff();
        this.garageView.openWinMessage(name, time);

        this.model.saveWinner(id, { id, wins: 1, time }).then(() => this.renderWinnersPage());
      })
      .catch(() => {
        this.garageView.raceModeOff();
        this.garageView.openWinMessage();
      });
  };

  private resetRaceCallback = (): void => {
    this.garageView.getCarTracksArray().forEach((car) => car.stop());
  };

  private switchGaragePageCallback = (direction: SwitchPageDirections): Promise<number> =>
    this.model.switchCurrentGaragePage(direction).finally(() => this.renderGaragePage());

  private switchWinnersPageCallback = (direction: SwitchPageDirections): Promise<number> =>
    this.model.switchCurrentWinnersPage(direction).finally(() => this.renderWinnersPage());

  private sortWinnersCallback = (order?: SortOrder): void => {
    this.model.setSortOrder(order);
    this.renderWinnersPage();
  };

  start(): void {
    this.renderGaragePage();
    this.renderWinnersPage();
  }
}
