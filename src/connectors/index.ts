import parents from './parents';
import middle from './middle';
import children from './children';
import Family from '../models/family';
import { IConnector } from '../types';

export default (families: Family[]): IConnector[] => (
  [
    parents(families.filter(f => f.type === 'parent')),
    middle(families.filter(f => f.type === 'root')),
    children(families.filter(f => f.type === 'root' || f.type === 'child')),
  ]
    .reduce((all, next) => all.concat(next), [])
);
