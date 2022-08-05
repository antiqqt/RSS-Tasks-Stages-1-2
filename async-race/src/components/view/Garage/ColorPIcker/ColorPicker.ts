import BaseComponent from '../../../common/BaseComponent/BaseComponent';

export default class ColorPicker extends BaseComponent {
  constructor() {
    super('input');

    this.setAttribute('type', 'color').setClass('bg-slate-300 rounded cursor-pointer');
  }

  getColorInput(): string {
    if (this.element instanceof HTMLInputElement) {
      return this.element.value;
    }
    throw new Error('Element is not instance of HTMLInputElement');
  }

  setColorInput(color: string): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = color;
      return;
    }
    throw new Error('Element is not instance of HTMLInputElement');
  }
}
