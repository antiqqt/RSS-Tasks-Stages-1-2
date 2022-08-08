import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import { GetCarCallback, OrderTypes, SortButtonStates, SortCallback, SortTypes, WinnerData } from '../../../types';
import SortButton from '../SortButton/SortButton';

const WINNERS_PER_PAGE = 10;

export default class Leaderboard extends BaseComponent {
  private head: BaseComponent;

  private body: BaseComponent;

  private winsSortBtn: SortButton;

  private timeSortBtn: SortButton;

  constructor(private onGetCar: GetCarCallback, private onSort: SortCallback) {
    super('table');
    this.setClass('cursor-default');
    this.setAttribute('sortable');

    this.head = new BaseComponent('thead').attachTo(this);
    this.body = new BaseComponent('tbody').attachTo(this);

    this.winsSortBtn = new SortButton('Wins');
    this.timeSortBtn = new SortButton('Best time (seconds)');

    this.renderHeaders();
  }

  renderHeaders(): void {
    const theadersRow = new BaseComponent('tr').setClass('min-h-8 bg-blue-500 text-md text-white').attachTo(this.head);

    new BaseComponent('th').setInnerText('Number').attachTo(theadersRow);
    new BaseComponent('th').setInnerText('Car').attachTo(theadersRow);
    new BaseComponent('th').setInnerText('Name').attachTo(theadersRow);

    this.winsSortBtn.attachTo(theadersRow).setHandler('click', this.winsSortHandler);

    this.timeSortBtn.attachTo(theadersRow).setHandler('click', this.timeSortHandler);
  }

  renderPage(rows: WinnerData[], currentPageIndex: number): void {
    this.body.clearInnerHTML();

    rows.forEach(({ wins, time, id }: WinnerData, rowIndex) => {
      const row = new BaseComponent('tr').setClass('text-center text-md font-medium').attachTo(this.body);

      this.onGetCar(id).then(({ name, color }) => {
        new BaseComponent('td')
          .setInnerText(`${WINNERS_PER_PAGE * (currentPageIndex - 1) + rowIndex + 1}`)
          .attachTo(row);
        new BaseComponent('td')
          .setInnerHTML(
            ` <svg class="w-7 h-7 rotate-90" style="fill: ${color};">
                <use xlink:href="#car-top-view"></use>
              </svg>`
          )
          .attachTo(row);
        new BaseComponent('td').setInnerText(`${name}`).attachTo(row);
        new BaseComponent('td').setInnerText(`${wins}`).attachTo(row);
        new BaseComponent('td').setInnerText(`${time}s`).attachTo(row);
      });
    });
  }

  private winsSortHandler = (): void => {
    const state = this.winsSortBtn.getCurrentState();

    if (state === SortButtonStates.DEFAULT) {
      this.winsSortBtn.setDescending();
      this.timeSortBtn.setDefault();
      this.onSort([SortTypes.WINS, OrderTypes.DESC]);
    } else if (state === SortButtonStates.DESC) {
      this.winsSortBtn.setAscending();
      this.onSort([SortTypes.WINS, OrderTypes.ASC]);
    } else if (state === SortButtonStates.ASC) {
      this.winsSortBtn.setDefault();
      this.onSort();
    }
  };

  private timeSortHandler = (): void => {
    const state = this.timeSortBtn.getCurrentState();

    if (state === SortButtonStates.DEFAULT) {
      this.timeSortBtn.setDescending();
      this.winsSortBtn.setDefault();
      this.onSort([SortTypes.TIME, OrderTypes.DESC]);
    } else if (state === SortButtonStates.DESC) {
      this.timeSortBtn.setAscending();
      this.onSort([SortTypes.TIME, OrderTypes.ASC]);
    } else if (state === SortButtonStates.ASC) {
      this.timeSortBtn.setDefault();
      this.onSort();
    }
  };
}
