import BaseComponent from '../../../common/BaseComponent/BaseComponent';

export default class SearchBar extends BaseComponent {
  constructor() {
    super('input');

    this.setAttribute('type', 'text')
      .setAttribute('autocomplete', 'off')
      .setClass('px-2 text-slate-700 font-semibold bg-slate-300 rounded outline-indigo-300 cursor-pointer');
  }

  getTextInput(): string {
    if (this.element instanceof HTMLInputElement) {
      return this.element.value;
    }
    throw new Error('Element is not instance of HTMLInputElement');
  }

  setTextInput(text: string): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = text;
      return;
    }
    throw new Error('Element is not instance of HTMLInputElement');
  }
}
