import BaseComponent from '../../common/BaseComponent/BaseComponent';
import Button from '../../common/Button/Button';
import { GetCarCallback, SortCallback, SwitchPageCallback, SwitchPageDirections, WinnersData } from '../../types';
import Leaderboard from './Leaderboard/Leaderboard';

export default class WinnersView extends BaseComponent {
  private winnersCounter: BaseComponent;

  private pageCounter: BaseComponent;

  private leaderboard: Leaderboard;

  private nextBtn: Button;

  private prevBtn: Button;

  constructor(
    private onGetCar: GetCarCallback,
    private onSwitchPage: SwitchPageCallback,
    private onSortWinners: SortCallback
  ) {
    super('section');

    this.setClass('flex flex-col xl:w-5/6 gap-y-2 pt-8');

    this.winnersCounter = new BaseComponent('p')
      .setClass(['font-bold', 'text-2xl', 'capitalize'])
      .setInnerText(`Winners (4)`)
      .attachTo(this);

    this.pageCounter = new BaseComponent('p')
      .setClass(['font-semibold', 'text-lg', 'capitalize'])
      .setInnerText('Page #1');

    this.prevBtn = new Button('prev', 'dark');
    this.nextBtn = new Button('next', 'dark');
    this.renderPageControls().attachTo(this);

    this.leaderboard = new Leaderboard(this.onGetCar, this.onSortWinners).attachTo(this);
  }

  private renderPageControls(): BaseComponent {
    const container = new BaseComponent('div').setClass('flex items-center gap-x-3');

    this.pageCounter.attachTo(container);

    this.prevBtn
      .attachTo(container)
      .disable()
      .setHandler('click', () => {
        if (this.prevBtn.getStatus() === 'disabled') return;

        this.onSwitchPage(SwitchPageDirections.PREV).then((currPageIndex) => this.setPageCounter(currPageIndex));
      });

    this.nextBtn
      .attachTo(container)
      .disable()
      .setHandler('click', () => {
        if (this.nextBtn.getStatus() === 'disabled') return;

        this.onSwitchPage(SwitchPageDirections.NEXT).then((currPageIndex) => this.setPageCounter(currPageIndex));
      });

    return container;
  }

  renderPage({ items, count }: WinnersData, currentPageIndex: number): void {
    this.winnersCounter.setInnerText(`Winners (${count})`);
    this.leaderboard.renderPage(items, currentPageIndex);
  }

  setPageCounter(pageIndex: number): void {
    this.pageCounter.setInnerText(`Page #${pageIndex}`);
  }

  disableNextPageBtn(): void {
    this.nextBtn.disable();
  }

  enableNextPageBtn(): void {
    this.nextBtn.enable();
  }

  disablePrevPageBtn(): void {
    this.prevBtn.disable();
  }

  enablePrevPageBtn(): void {
    this.prevBtn.enable();
  }
}
