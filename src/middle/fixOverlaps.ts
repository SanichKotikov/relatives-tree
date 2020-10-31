import { setDefaultUnitShift } from '../utils/setDefaultUnitShift';
import { prop, withId } from '../utils';
import { Family, IFamilyNode, Unit } from '../types';

// left is blood, right is adopted
export default (lFamily: Family, rFamily: Family) => {
  const lChildren: IFamilyNode[] = lFamily.children
    .reduce((a: IFamilyNode[], b: Unit) => a.concat(b.nodes), []);
  const rChildren: IFamilyNode[] = rFamily.children
    .reduce((a: IFamilyNode[], b: Unit) => a.concat(b.nodes), []);

  const ids = lChildren.filter(node => !!rChildren.find(withId(node.id))).map(prop('id'));
  const shifts = lFamily.children.map(prop('pos'));

  // TODO:
  lFamily.children = lFamily.children.sort((a, b) => {
    const foundA = !!a.nodes.find(node => ids.indexOf(node.id) !== -1);
    const foundB = !!b.nodes.find(node => ids.indexOf(node.id) !== -1);

    if (foundA && !foundB) return 1;
    else if (!foundA && foundB) return -1;
    return 0;
  });

  // reapply shifts
  lFamily.children.forEach((unit, idx) => unit.pos = shifts[idx]);

  // remove
  rFamily.children = rFamily.children.filter(unit => (
    !!unit.nodes.find(node => ids.indexOf(node.id) === -1)
  ));

  setDefaultUnitShift(rFamily);
};
