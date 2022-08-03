import { CarData, UpdateCarCallback } from '../../types';
import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import Button from '../../../common/Button/Button';
import ColorPicker from '../ColorPIcker/ColorPicker';
import SearchBar from '../SearchBar/SearchBar';

export default class CarUpdateField extends BaseComponent {
  private searchBar: SearchBar;

  private colorPicker: ColorPicker;

  private btn: BaseComponent;

  private openedCarID: number | null;

  constructor(private onUpdate: UpdateCarCallback) {
    super('div');
    this.setClass('flex gap-x-4');

    this.openedCarID = null;
    this.searchBar = new SearchBar().attachTo(this);
    this.colorPicker = new ColorPicker().attachTo(this);
    this.btn = new Button('update', 'dark').attachTo(this);

    this.writingModeOff();
  }

  open({ name, color, id }: CarData): void {
    this.writingModeOn();

    this.searchBar.setTextInput(name);
    this.colorPicker.setColorInput(color);
    this.openedCarID = id;

    this.btn.setHandler(
      'click',
      () => {
        if (!this.openedCarID) return;

        this.onUpdate(this.openedCarID, {
          name: this.searchBar.getTextInput(),
          color: this.colorPicker.getColorInput(),
        });

        this.writingModeOff();
      },
      { once: true }
    );
  }

  close(): void {
    this.writingModeOff();
  }

  private writingModeOn(): void {
    [this.searchBar, this.colorPicker, this.btn].forEach((elem) =>
      elem.removeClass('opacity-50 cursor-not-allowed').setClass('cursor-pointer')
    );

    this.btn.setClass('cursor-pointer hover:border-indigo-400');
  }

  private writingModeOff(): void {
    [this.searchBar, this.colorPicker, this.btn].forEach((elem) =>
      elem.removeClass('cursor-pointer').setClass('opacity-50 cursor-not-allowed')
    );

    this.btn.removeClass('cursor-pointer hover:border-indigo-400');
    this.searchBar.setTextInput('');
    this.colorPicker.setColorInput('#000000');
  }
}
