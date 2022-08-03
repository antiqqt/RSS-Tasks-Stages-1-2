import BaseComponent from '../common/BaseComponent/BaseComponent';
import GarageController from '../Garage/GarageController';

export default class App {
  private garageСontroller: GarageController;

  constructor(container: HTMLElement | BaseComponent) {
    this.garageСontroller = new GarageController(container);
  }

  start(): void {}
}
