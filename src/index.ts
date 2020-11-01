import Store from './store';
import { placeholders } from './middle/placeholders';
import { middle } from './middle/create';
import { parents } from './parents/create';
import { children } from './children/create';
import { connectors } from './connectors';
import { correctPositions } from './utils/correctPositions';
import { getCanvasSize } from './utils/getCanvasSize';
import { getExtendedNodes } from './utils/getExtendedNodes';
import { pipe } from './utils';
import { Node, Options, RelData } from './types';

const pipeline = pipe(middle, parents, children, correctPositions);

export default (nodes: readonly Node[], options: Options): RelData => {
  const store = new Store(nodes, options.rootId);
  if (options.placeholders) placeholders(store);

  const families = pipeline(store).familiesArray;

  return {
    families: families,
    canvas: getCanvasSize(families),
    nodes: getExtendedNodes(families),
    connectors: connectors(families),
  };
}
