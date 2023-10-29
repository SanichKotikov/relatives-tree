import { parents } from './parents';
import { middle } from './middle';
import { children } from './children';
const toConnectors = (families) => (fn) => fn(families);
export const connectors = (families) => [parents, middle, children].map(toConnectors(families)).flat();
