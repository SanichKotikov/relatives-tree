import Family from '../models/family';
import Unit from '../models/unit';
import { withId } from './index';
import { IFamilyNode } from '../types';

const inUnits = (units: Unit[], nodeId: string) => (
  !!units.find(unit => (
    !!unit.nodes.find(withId(nodeId))
  ))
);

export default (family: Family, node: IFamilyNode): boolean => {

  if (family.type !== 'child' && inUnits(family.pUnits, node.id)) {
    return (
      (!node.parents.length && !!node.siblings.length) ||
      (family.type === 'parent' && node.children.length > 1)
    );
  }

  if (family.type !== 'parent' && inUnits(family.cUnits, node.id)) {
    const parentIds = family.pUnits[0].ids;

    // TODO
    const sameParents: boolean = !!node.parents
      .filter(rel => parentIds.indexOf(rel.id) !== -1)
      .length;

    return (!sameParents && (!!node.parents.length || !!node.siblings.length));
  }

  return false;
};