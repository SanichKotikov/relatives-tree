import { prop, withIds } from '../utils';
import { getUnitX, nodeCount } from '../utils/units';
import { withType } from '../utils/family';
import { HALF_SIZE, SIZE } from '../constants';
import { Connector, Family, FamilyType, Unit } from '../types';

const getChildIDs = (unit: Unit): readonly string[] => (
  unit.nodes.map(prop('children')).flat().map(prop('id'))
);

const getConnectors = (family: Family) => (
  (connectors: Connector[], unit: Unit) => {
    const pX = getUnitX(family, unit) + nodeCount(unit);
    const pY = family.Y + HALF_SIZE;
    const mY = family.Y + SIZE;

    // between parents
    if (nodeCount(unit) === 2) {
      connectors.push({ points: [pX - HALF_SIZE, pY, pX + HALF_SIZE, pY] });
    }

    // from parent(s) to child
    connectors.push({ points: [pX, pY, pX, mY] });

    const child = family.children[0];

    const cX = (
      getUnitX(family, child) +
      (child.nodes.findIndex(withIds(getChildIDs(unit))) * SIZE) + HALF_SIZE
    );

    // from child to parent(s)
    connectors.push({ points: [cX, mY, cX, mY + HALF_SIZE] });

    // horizontal between parent(s) and child
    if (pX !== cX) connectors.push({ points: [Math.min(pX, cX), mY, Math.max(pX, cX), mY] });

    return connectors;
  }
);

export const parents = (families: Family[]): readonly Connector[] => {
  return families
    .filter(withType(FamilyType.parent))
    .reduce<Connector[]>((connectors, family) => (
      connectors.concat(family.parents.reduce(getConnectors(family), []))
    ), []);
};
