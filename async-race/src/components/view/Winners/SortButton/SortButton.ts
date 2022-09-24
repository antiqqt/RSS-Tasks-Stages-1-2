import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import { SortButtonStates } from '../../../types';

export default class SortButton extends BaseComponent {
  private state = SortButtonStates.DEFAULT;

  constructor(private name: string) {
    super('th');
    this.setClass('cursor-pointer');
    this.setDefault();
  }

  setDefault(): this {
    this.setInnerText(this.name);
    this.state = SortButtonStates.DEFAULT;

    return this;
  }

  setAscending(): this {
    this.setInnerText(`${this.name}↑`);
    this.state = SortButtonStates.ASC;

    return this;
  }

  setDescending(): this {
    this.setInnerText(`${this.name}↓`);
    this.state = SortButtonStates.DESC;

    return this;
  }

  getCurrentState(): SortButtonStates {
    return this.state;
  }
}
