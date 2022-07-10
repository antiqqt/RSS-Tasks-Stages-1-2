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
        this.view.drawCards(this.controller.getCardsData());
        this.addCartHandler();
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
}
