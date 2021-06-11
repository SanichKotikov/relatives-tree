import { prop, withIds } from '../utils';
import { getUnitX, nodeCount } from '../utils/units';
import { getParentsX, withType } from '../utils/family';
import { HALF_SIZE, NODES_IN_COUPLE, SIZE } from '../constants';
import { Connector, Family, FamilyType, Unit } from '../types';

const getChildIDs = (unit: Unit): readonly string[] => (
  unit.nodes.map(prop('children')).flat().map(prop('id'))
);

const calcConnectors = (family: Family) => (
  (connectors: Connector[], unit: Unit) => {
    const pX = getParentsX(family, unit);
    const pY = family.Y + HALF_SIZE;
    const mY = family.Y + SIZE;

    // between parents
    if (nodeCount(unit) === NODES_IN_COUPLE) connectors.push([pX - HALF_SIZE, pY, pX + HALF_SIZE, pY]);
    // from parent(s) to child
    connectors.push([pX, pY, pX, mY]);

    const child = family.children[0]!;

    const cX = (
      getUnitX(family, child) +
      (child.nodes.findIndex(withIds(getChildIDs(unit))) * SIZE) + HALF_SIZE
    );

    // from child to parent(s)
    connectors.push([cX, mY, cX, mY + HALF_SIZE]);
    // horizontal between parent(s) and child
    if (pX !== cX) connectors.push([Math.min(pX, cX), mY, Math.max(pX, cX), mY]);

    return connectors;
  }
);

export const parents = (families: readonly Family[]): readonly Connector[] => (
  families
    .filter(withType(FamilyType.parent))
    .reduce<Connector[]>((connectors, family) => (
      connectors.concat(family.parents.reduce(calcConnectors(family), []))
    ), [])
);
