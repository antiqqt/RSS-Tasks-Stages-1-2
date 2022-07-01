import { Article, Source, ServerResponse } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ServerResponse): void {
        let values: Article[] = [];

        if ('articles' in data) {
            values = data.articles;
        }

        this.news.draw(values);
    }

    drawSources(data: ServerResponse): void {
        let values: Source[] = [];

        if ('sources' in data) {
            values = data.sources;
        }

        this.sources.draw(values);
    }
}

export default AppView;
