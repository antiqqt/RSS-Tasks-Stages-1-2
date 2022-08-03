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
    this.model.getCars().then((data) => this.view.renderPage(data));
  }

  private createCarCallback = (data: NewCarData): void => {
    this.model.createCar(data).then(() => this.renderPage());
  };

  private selectCarCallback = (id: number): void => {
    this.model.getCar(id).then((data) => this.view.openСarUpdate(data));
  };

  private updateCarCallback = (id: number, body: NewCarData): void => {
    this.model.updateCar(id, body).then(() => this.renderPage());
  };

  private deleteCarCallback = (id: number): void => {
    this.model.deleteCar(id).then(() => this.renderPage());
  };

  private switchPageCallback = (direction: SwitchPageDirections): Promise<[number, number]> =>
    this.model
      .switchCurrentPage(direction)
      .then((indexes) => indexes)
      .finally(() => this.renderPage());

  start(): void {
    this.renderPage();
  }
}
