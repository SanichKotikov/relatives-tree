import Family from '../models/family';
import Unit from '../models/unit';
import setUnitDefShifts from '../utils/setUnitDefShifts';
import { prop, withId } from '../utils';
import { IFamilyNode } from '../types';

// left is blood, right is adopted
export default (lFamily: Family, rFamily: Family) => {
  const lChildren: IFamilyNode[] = lFamily.cUnits
    .reduce((a: IFamilyNode[], b: Unit) => a.concat(b.nodes), []);
  const rChildren: IFamilyNode[] = rFamily.cUnits
    .reduce((a: IFamilyNode[], b: Unit) => a.concat(b.nodes), []);

  const ids = lChildren.filter(node => !!rChildren.find(withId(node.id))).map(prop('id'));
  const shifts = lFamily.cUnits.map(prop('shift'));

  // TODO:
  lFamily.cUnits = lFamily.cUnits.sort((a, b) => {
    const foundA = !!a.nodes.find(node => ids.indexOf(node.id) !== -1);
    const foundB = !!b.nodes.find(node => ids.indexOf(node.id) !== -1);

    if (foundA && !foundB) return 1;
    else if (!foundA && foundB) return -1;
    return 0;
  });

  // reapply shifts
  lFamily.cUnits.forEach((unit, idx) => unit.shift = shifts[idx]);

  // remove
  rFamily.cUnits = rFamily.cUnits.filter(unit => (
    !!unit.nodes.find(node => ids.indexOf(node.id) === -1)
  ));

  setUnitDefShifts(rFamily);
};
