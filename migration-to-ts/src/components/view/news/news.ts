import { Article } from '../../../types';
import './news.scss';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            const newsItem = newsClone.querySelector('.news__item') as HTMLDivElement;

            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;

            const newsDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLHeadingElement;
            const newsDescriptionSrc = newsClone.querySelector('.news__description-source') as HTMLSourceElement;
            const newsDescriptionContent = newsClone.querySelector(
                '.news__description-content'
            ) as HTMLParagraphElement;
            const newsReadMoreLink = newsClone.querySelector('.news__read-more a') as HTMLLinkElement;

            if (idx % 2) newsItem.classList.add('alt');

            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            newsDescriptionTitle.textContent = item.title;
            newsDescriptionSrc.textContent = item.source.name;
            newsDescriptionContent.textContent = item.description;
            newsReadMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLDivElement;
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
