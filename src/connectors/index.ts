import parents from './parents';
import middle from './middle';
import children from './children';
import { flat } from '../utils';
import Family from '../models/family';
import { IConnector } from '../types';

const sequence = [parents, middle, children];
const toConnectors = (families: Family[]) => (fn: Function) => fn(families);

export default (families: Family[]): IConnector[] => (
  sequence.map(toConnectors(families)).reduce(flat)
);
