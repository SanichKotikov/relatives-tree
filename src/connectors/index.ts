import { parents } from './parents';
import { middle } from './middle';
import { children } from './children';
import { flat } from '../utils';
import { Family, IConnector } from '../types';

const sequence = [parents, middle, children];

const toConnectors = (families: ReadonlyArray<Family>) => (fn: Function) => fn(families);

export const connectors = (families: ReadonlyArray<Family>): ReadonlyArray<IConnector> => (
  sequence.map(toConnectors(families)).reduce(flat)
);
