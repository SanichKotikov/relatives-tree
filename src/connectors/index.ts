import parents from './parents';
import middle from './middle';
import children from './children';
import { flat } from '../utils';
import Family from '../models/family';
import { IConnector } from '../types';

const sequence = [parents, middle, children];

function toConnectors(families: ReadonlyArray<Family>) {
  return (fn: Function) => fn(families);
}

export default (families: ReadonlyArray<Family>): ReadonlyArray<IConnector> => {
  return sequence.map(toConnectors(families)).reduce(flat);
}
