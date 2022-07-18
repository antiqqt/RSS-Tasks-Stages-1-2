import { SortField, SortFieldType } from '../../types';
import Controller from '../controller/appController';
import View from '../view/appView';

export default class App {
    private view: View;
    private controller: Controller;
    private boundUpdateCards = this.updateCards.bind(this);

    constructor() {
        this.view = new View();
        this.controller = new Controller();
    }

    public start(): void {
        this.view.drawFilter('type', this.controller.getFilterOptions('type'));
        this.view.drawFilter('color', this.controller.getFilterOptions('color'));
        this.view.drawFilter('pattern', this.controller.getFilterOptions('pattern'));
        this.view.drawFilter('manufacturer', this.controller.getFilterOptions('manufacturer'));
        this.view.drawSlider('quantity');
        this.view.drawSlider('year');
        this.view.addResetFiltersBtn();
        this.view.addResetSettingsBtn();

        this.view.updateCartCounter(this.controller.getNumOfItemsInCart());
        this.view.applySavedFiltersState(this.controller.getSavedFilterState());
        this.view.setSearchBarValue(this.controller.getSavedSearchBarState());

        this.view.drawCards(
            this.controller.getFilteredCardsData(this.view.getFilterQuery(), this.view.getSearchBarQuery())
        );
        this.view.sortCards(this.controller.getSavedSortState());
        this.view.setSortOption(this.controller.getSavedSortState());

        this.addCartHandler();
        this.addSortHandler();
        this.addFiltersHandler();
        this.addResetFiltersHandler();
        this.addResetSettingsHandler();
        this.addSearchBarHandler();

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
            const sortOrder = selectedOption.value.split('-') as [SortField, SortFieldType];

            this.view.sortCards(sortOrder);
            this.controller.saveSortState(sortOrder);
        });
    }

    private addFiltersHandler(): void {
        const filters = this.view.getFiltersContainer();
        const sliders = this.view.getSliders();

        filters.addEventListener('change', this.boundUpdateCards);
        sliders.forEach((slider) => slider.onChange(this.boundUpdateCards));
    }

    private addResetFiltersHandler(): void {
        this.view.addResetFiltersBtnOnClick(() => {
            this.view.resetAllFilters();
            this.updateCards();
        });
    }

    private addResetSettingsHandler(): void {
        this.view.addResetSettingsBtnOnClick(() => {
            localStorage.removeItem('antiqqt-store-state');

            this.controller.clearCart();
            this.view.updateCartCounter(this.controller.getNumOfItemsInCart());

            this.view.resetAllFilters();
            this.updateCards();

            const defaultSortState: [SortField, SortFieldType] = ['type', 'a'];
            this.view.sortCards(defaultSortState);
            this.view.setSortOption(defaultSortState);
            this.controller.saveSortState(defaultSortState);
        });
    }

    private addSearchBarHandler(): void {
        this.view.addSearchBarOnInput(this.boundUpdateCards);
        this.view.addSearchBarOnClear(this.boundUpdateCards);
    }

    private updateCards(): void {
        const searchBarQuery = this.view.getSearchBarQuery();
        const filterQuery = this.view.getFilterQuery();
        const filteredData = this.controller.getFilteredCardsData(filterQuery, searchBarQuery);

        this.controller.saveSearchBarState(searchBarQuery);
        this.view.redrawCards(filteredData);
    }
}
