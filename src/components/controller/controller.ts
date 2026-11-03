import { NewsApi } from '../../types/NewsApi';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: () => void) {
        super.getResp(
            'sources',
            {},
            callback
        );
    }

    getNews(e: Event, callback: (data: NewsApi[]) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId === null) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        `everything?sources=${sourceId}`,
                        {},
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
