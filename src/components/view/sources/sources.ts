import { SourcesApi } from '../../../types/SourceApi';
import './sources.css';

class Sources {
    draw(data: SourcesApi[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const sourceName = sourceClone.querySelector('.source__item-name');
            const sourceElement = sourceClone.querySelector('.source__item');

            if (!sourceName || !sourceElement) return;

            sourceName.textContent = item.name;
            sourceElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
