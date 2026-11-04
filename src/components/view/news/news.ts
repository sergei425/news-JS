import { NewsApi } from '../../../types/NewsApi';
import './news.css';

class News {
    draw(data: NewsApi[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItem = newsClone.querySelector<HTMLDivElement>('.news__item');

            if (idx % 2) newsItem?.classList.add('alt');

            const metaPhoto = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) metaAuthor.textContent = item.author || item.source.name;

            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const descriptionTitle = newsClone.querySelector('.news__description-title');
            if (descriptionTitle) descriptionTitle.textContent = item.title;

            const descriptionSource = newsClone.querySelector('.news__description-source');
            if (descriptionSource) descriptionSource.textContent = item.source.name;

            const descriptionContent = newsClone.querySelector('.news__description-content');
            if (descriptionContent) descriptionContent.textContent = item.description;

            const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (readMoreLink) readMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (!newsContainer) return;

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
