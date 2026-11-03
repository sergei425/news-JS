import { NewsApi } from '../../types/NewsApi';
import { SourcesApi } from '../../types/SourceApi';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsApi[]) {
        const values = data ?? [];
        console.log('articles', values);
        this.news.draw(values);
    }

    drawSources(data: Response & { sources: SourcesApi[] }) {
        const values: SourcesApi[] = data.sources?? [];
        console.log('drawSources', values);
        this.sources.draw(values);
    }
}

export default AppView;
