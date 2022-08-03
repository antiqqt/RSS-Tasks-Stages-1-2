import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import Button from '../../../common/Button/Button';
import { SwitchPageCallback, SwitchPageDirections } from '../../types';

export default class PageControls extends BaseComponent {
  private counter: BaseComponent;

  private nextBtn: Button;

  private prevBtn: Button;

  constructor(private onSwitchPage: SwitchPageCallback) {
    super('div');
    this.setClass('flex items-center gap-x-3');

    this.counter = new BaseComponent('p')
      .setClass(['font-semibold', 'text-lg', 'capitalize'])
      .setInnerText('Page #1')
      .attachTo(this);

    this.prevBtn = new Button('prev', 'dark')
      .disable()
      .attachTo(this)
      .setHandler('click', () => {
        if (this.prevBtn.getStatus() === 'disabled') return;

        this.onSwitchPage(SwitchPageDirections.PREV).then(([currentPageIndex]) => {
          this.setCounter(currentPageIndex);

          if (currentPageIndex === 1) this.prevBtn.disable();
          this.nextBtn.enable();
        });
      });

    this.nextBtn = new Button('next', 'dark').attachTo(this).setHandler('click', () => {
      if (this.nextBtn.getStatus() === 'disabled') return;

      this.onSwitchPage(SwitchPageDirections.NEXT).then(([currentPageIndex, lastPageIndex]) => {
        this.setCounter(currentPageIndex);

        if (currentPageIndex === lastPageIndex) this.nextBtn.disable();
        this.prevBtn.enable();
      });
    });
  }

  setCounter(pageIndex: number): void {
    this.counter.setInnerText(`Page #${pageIndex}`);
  }
}
