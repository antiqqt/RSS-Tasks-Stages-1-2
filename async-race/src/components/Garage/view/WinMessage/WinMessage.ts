import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import Button from '../../../common/Button/Button';
import { WinMessageData } from '../../types';

export default class WinMessage extends BaseComponent {
  private textElement: BaseComponent;

  constructor() {
    super('div');

    this.setClass([
      'hidden',
      'fixed',
      'inset-0',
      'flex',
      'justify-center',
      'items-center',
      'bg-slate-900/50',
      'z-10',
      'hover:cursor-pointer',
    ]);

    this.setHandler('click', (e: Event) => {
      const { target } = e;
      if (target == null) return;
      if (target !== this.element) return;

      this.hide();
    });

    const block = new BaseComponent('div')
      .attachTo(this)
      .setClass([
        'relative',
        'flex',
        'flex-col',
        'items-center',
        'gap-y-5',
        'min-w-48',
        'px-2',
        'py-3',
        'bg-gray-100',
        'rounded-md',
        'hover:cursor-default',
      ]);

    this.textElement = new BaseComponent('p')
      .setClass('font-semibold text-3xl text-slate-600 text-center')
      .attachTo(block);

    new Button('Close', 'dark').attachTo(block).setHandler('click', () => this.hide());
  }

  open([carName, raceTime]: WinMessageData): void {
    this.removeClass('hidden');

    this.textElement.setInnerText(`${carName} wins! [${new Date(raceTime).getUTCSeconds()}s]`);
  }

  hide(): void {
    this.setClass('hidden');
  }
}
