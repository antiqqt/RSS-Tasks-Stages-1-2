import BaseComponent from '../BaseComponent/BaseComponent';

type BtnColors = 'light' | 'dark';

type BtnStatus = 'enabled' | 'disabled';

export default class Button extends BaseComponent {
  private status: BtnStatus;

  constructor(text: string, color: BtnColors) {
    super('button');

    this.setInnerText(text).setClass([
      'flex',
      'justify-center',
      'items-center',
      'w-max',
      'h-6',
      'px-2',
      'py-1',
      'font-medium',
      'text-gray-600',
      'capitalize',
      'border-2',
      'border-transparent',
      'rounded',
      'transition-colors',
      'cursor-pointer',
    ]);

    if (color === 'light') {
      this.setClass('bg-yellow-100 hover:border-indigo-400');
    } else {
      this.setClass('bg-indigo-200 hover:border-indigo-400');
    }

    this.status = 'enabled';
  }

  enable(): this {
    this.removeClass('cursor-not-allowed opacity-50');
    this.setClass('cursor-pointer hover:border-indigo-400 opacity-100');
    this.status = 'enabled';

    return this;
  }

  disable(): this {
    this.removeClass('cursor-pointer hover:border-indigo-400 opacity-100');
    this.setClass('cursor-not-allowed opacity-50');
    this.status = 'disabled';

    return this;
  }

  getStatus(): BtnStatus {
    return this.status;
  }
}
