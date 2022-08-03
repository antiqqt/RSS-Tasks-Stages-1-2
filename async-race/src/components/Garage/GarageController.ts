import BaseComponent from '../common/BaseComponent/BaseComponent';
import GarageModel from './GarageModel';
import GarageView from './view/GarageView';
import { NewCarData, SwitchPageDirections } from './types';

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
      this.switchPageCallback
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

  private switchPageCallback = (direction: SwitchPageDirections): Promise<number> =>
    this.model.switchCurrentPage(direction).finally(() => this.renderPage());

  start(): void {
    this.renderPage();
  }
}
