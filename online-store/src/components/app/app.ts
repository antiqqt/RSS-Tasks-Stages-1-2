import { SortField, SortFieldType } from '../../types';
import Controller from '../controller/appController';
import View from '../view/appView';

export default class App {
    private view: View;
    private controller: Controller;

    constructor() {
        this.view = new View();
        this.controller = new Controller();
    }

    public start(): void {
        this.view.drawFilter('type', this.controller.getFilterOptions('type'));
        this.view.drawFilter('color', this.controller.getFilterOptions('color'));
        this.view.drawFilter('pattern', this.controller.getFilterOptions('pattern'));
        this.view.drawFilter('manufacturer', this.controller.getFilterOptions('manufacturer'));

        this.view.drawCards(this.controller.getCardsData());
        this.view.sortCards('type', 'a');

        this.addCartHandler();
        this.addSortHandler();
        this.addFiltersHandler();

        const header = document.getElementById('header');
        if (header !== null) {
            header.append(this.view.getCartElement());
        }

        const mainContent = document.getElementById('mainContent');
        if (mainContent != null) {
            mainContent.append(this.view.getCardsContainer());
        }

        const sidebar = document.getElementById('sidebar');
        if (sidebar != null) {
            sidebar.append(this.view.getSortElement(), this.view.getFiltersContainer());
        }
    }

    private addCartHandler(): void {
        const cardsContainer = this.view.getCardsContainer();

        cardsContainer.addEventListener('click', (e: Event) => {
            if (!(e.target instanceof Element)) return;

            const card = e.target.closest('figure');
            if (card == null) return;

            const cardWrapper = card.parentElement;
            if (cardWrapper == null) return;

            const cardId = card.dataset.id;
            if (cardId === undefined) return;

            const cardIsInCart = this.controller.checkInCart(cardId);
            if (cardIsInCart) {
                cardWrapper.classList.remove('isInCart');
                this.controller.removeFromCart(cardId);
            } else {
                const cartIsFull = this.controller.getNumOfItemsInCart() === 20;
                if (cartIsFull) {
                    this.view.showCartModal();
                    return;
                }
                cardWrapper.classList.add('isInCart');
                this.controller.addToCart(cardId);
            }

            this.view.updateCartCounter(this.controller.getNumOfItemsInCart());
        });
    }

    private addSortHandler(): void {
        const sortSelectElement = this.view.getSortSelectElement();

        sortSelectElement.addEventListener('change', () => {
            const options = sortSelectElement.options;
            const selectedOption = options[options.selectedIndex];
            const [field, type] = selectedOption.value.split('-') as [SortField, SortFieldType];

            this.view.sortCards(field, type);
        });
    }

    private addFiltersHandler(): void {
        const filters = this.view.getFiltersContainer();

        filters.addEventListener('change', () => {
            const query = this.view.getFilterQuery();
            const validCardsData = this.controller.getFilteredCardsData(query);
            this.view.redrawCards(validCardsData);
        });
    }
}
