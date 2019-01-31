import Store from './store';
import placeholders from './middle/placeholders';
import middle from './middle/create';
import parents from './parents/create';
import children from './children/create';
import connectors from './connectors';
import positions from './utils/correctPositions';
import getCanvasSize from './utils/getCanvasSize';
import getExtendedNodes from './utils/getExtendedNodes';
import { pipe } from './utils';
import { IFamilyNode, IFamilyData } from './types';

const pipeline = pipe(placeholders, middle, parents, children, positions);

export default (nodes: IFamilyNode[], rootId: string): IFamilyData => {
  const store = pipeline(new Store(nodes, rootId));

  return {
    families: store.familiesArray,
    canvas: getCanvasSize(store),
    nodes: getExtendedNodes(store.familiesArray),
    connectors: connectors(store.familiesArray),
  };
}
