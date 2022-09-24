import './menu.scss';

export default class Menu {
    draw(): void {
        const menu = document.querySelector<HTMLDivElement>('.menu') as HTMLDivElement;

        const sourcesBtn = document.createElement('button');
        sourcesBtn.innerText = 'Show sources';
        sourcesBtn.classList.add('menu__button');
        sourcesBtn.addEventListener('click', () => {
            menu.classList.toggle('menu--open');
            sourcesContainer.classList.toggle('sources--move');

            if (sourcesContainer.classList.contains('sources--show')) {
                setTimeout(() => sourcesContainer.classList.remove('sources--show'), 200);
            } else {
                sourcesContainer.classList.add('sources--show');
            }
        });

        const sourcesContainer = document.createElement('div');
        sourcesContainer.classList.add('sources', 'buttons');
        sourcesContainer.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;

            if (target !== sourcesContainer) {
                sourcesContainer.classList.remove('sources--move');
                sourcesContainer.classList.remove('sources--show');
                window.scrollTo(0, 0);
                setTimeout(() => menu.classList.remove('menu--open'), 300);
            }
        });

        menu.append(sourcesBtn, sourcesContainer);
    }
}
