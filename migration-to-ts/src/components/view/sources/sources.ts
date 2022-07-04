import { Source } from '../../../types';
import './sources.scss';

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            const sourceCloneItemName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            const sourceCloneItem = sourceClone.querySelector('.source__item') as HTMLDivElement;

            sourceCloneItemName.textContent = item.name;
            sourceCloneItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLDivElement;
        sourcesContainer.append(fragment);
    }
}

export default Sources;
