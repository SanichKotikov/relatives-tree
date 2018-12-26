import Store from './store';
import createPlaceholders from './middle/placeholders';
import createMiddle from './middle/create';
import createParents from './parents/create';
import createChildren from './children/create';
import correctPositions from './utils/correctPositions.js';
import getCanvasSize from './utils/getCanvasSize.js';
import { IFamilyNode, IFamilyData } from './types';

export default (nodes: IFamilyNode[], rootId: string): IFamilyData => {
  const store = new Store(nodes, rootId);

  createPlaceholders(store);
  createMiddle(store);
  createParents(store);
  createChildren(store);
  correctPositions(store);

  return {
    canvas: getCanvasSize(store),
    families: [...store.families.values()],
  };
}
