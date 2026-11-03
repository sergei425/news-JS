import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')?.
            addEventListener('click', (e) => this.controller.getNews(e, ((data: Parameters<AppView['drawNews']>[0]) => this.view.drawNews(data)) as () => void));
        this.controller.getSources((data?: Parameters<AppView['drawSources']>[0]) => {
            if (data) this.view.drawSources(data);
        });
    }
}

export default App;
