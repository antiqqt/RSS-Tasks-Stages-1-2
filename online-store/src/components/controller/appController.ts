import { CardData, CardsData, Errors, FilterOption } from '../../types';
import Model from '../model/appModel';

export default class Controller {
    private model: Model;

    constructor() {
        this.model = new Model();
    }

    public getCardsData(): CardsData {
        return this.model.getCurrentState();
    }

    public checkInCart(id: string): boolean {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        return data.inCart;
    }

    addToCart(id: string): void {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        data.inCart = true;
    }

    removeFromCart(id: string): void {
        const data = this.getCardsData().get(id);
        if (data == null) throw new Error(Errors.InvalidID);

        data.inCart = false;
    }

    getNumOfItemsInCart(): number {
        const items = [...this.getCardsData().values()];
        return items.filter((item) => item.inCart).length;
    }

    getFilterOptions(filterType: keyof CardData): FilterOption[] {
        const options = new Set<FilterOption>();

        this.getCardsData().forEach((item) => options.add(item[filterType]));

        return [...options];
    }
}
