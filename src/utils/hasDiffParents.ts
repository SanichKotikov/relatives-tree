import { IFamilyNode } from '../types';

// Means that you have both types of parents, blood and adopted
export default (node: IFamilyNode): boolean => {
  return node.parents
    .map(link => link.type)
    .filter((type, idx, types) => {
      return types.indexOf(type) === idx;
    })
    .length > 1;
};
