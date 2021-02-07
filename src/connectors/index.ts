import { parents } from './parents';
import { middle } from './middle';
import { children } from './children';
import { flat } from '../utils';
import { Connector, Family } from '../types';

const sequence = [parents, middle, children];

const toConnectors = (families: readonly Family[]) => (fn: Function) => fn(families);

export const connectors = (families: readonly Family[]): readonly Connector[] => (
  sequence.map(toConnectors(families)).reduce(flat)
);
