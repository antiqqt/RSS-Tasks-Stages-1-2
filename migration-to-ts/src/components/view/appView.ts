import { ServerResponse } from '../../types';
import News from './news/news';
import Sources from './sources/sources';
import Menu from './menu/menu';

export class AppView {
    private news: News;
    private sources: Sources;
    private menu: Menu;

    constructor() {
        this.news = new News();
        this.menu = new Menu();
        this.sources = new Sources();
    }

    drawNews(data: ServerResponse): void {
        if ('articles' in data) {
            const values = data.articles ? data.articles : [];
            this.news.draw(values);
        }
    }

    drawSources(data: ServerResponse): void {
        if ('sources' in data) {
            const values = data.sources ? data.sources : [];
            this.sources.draw(values);
        }
    }

    drawMenu(): void {
        this.menu.draw();
    }
}

export default AppView;
