import Store from './store';
import { placeholders } from './middle/placeholders';
import { inMiddleDirection } from './middle';
import { inParentDirection } from './parents';
import { inChildDirection } from './children';
import { connectors } from './connectors';
import { correctPositions } from './utils/correctPositions';
import { getCanvasSize } from './utils/getCanvasSize';
import { getExtendedNodes } from './utils/getExtendedNodes';
import { pipe } from './utils';
const calcFamilies = pipe(inMiddleDirection, inParentDirection, inChildDirection, correctPositions);
export default (nodes, options) => {
    const store = new Store(nodes, options.rootId);
    if (options.placeholders)
        placeholders(store);
    const families = calcFamilies(store).familiesArray;
    return {
        families: families,
        canvas: getCanvasSize(families),
        nodes: getExtendedNodes(families),
        connectors: connectors(families),
    };
};
