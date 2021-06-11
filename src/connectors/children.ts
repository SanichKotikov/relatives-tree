import { getParentsX, withType } from '../utils/family';
import { getUnitX, nodeCount, nodeIds } from '../utils/units';
import { inAscOrder, max, min, withId, withIds } from '../utils';
import { HALF_SIZE, NODES_IN_COUPLE, SIZE } from '../constants';
import { Connector, Family, FamilyType, Unit } from '../types';

export const children = (families: readonly Family[]): readonly Connector[] => (
  families
    .filter(withType(FamilyType.root, FamilyType.child))
    .reduce<Connector[]>((connectors, family) => {
      const parent: Unit | undefined = family.parents[0]!;

      const pX = getParentsX(family, parent);
      const mY = family.Y + (parent ? SIZE : 0);

      // from parent(s) to child
      if (parent && parent.nodes.every(node => !!node.children.length)) {
        const pY = family.Y + HALF_SIZE;
        connectors.push([pX, pY, pX, mY]);
      }

      const parentIds = family.parents.map(nodeIds).flat();
      const positions: number[] = [];

      family.children.forEach(unit => {
        const left = getUnitX(family, unit) + HALF_SIZE;

        // from child to parent(s)
        unit.nodes.forEach((node, index) => {
          if (node.parents.some(withIds(parentIds))) {
            const nX = left + (index * SIZE);
            positions.push(nX);
            connectors.push([nX, mY, nX, mY + HALF_SIZE]);
          }
        });

        // between child and child's spouse
        if (nodeCount(unit) === NODES_IN_COUPLE) {
          connectors.push([left, mY + HALF_SIZE, left + SIZE, mY + HALF_SIZE]);
        }

        // between child and child's side spouse
        else if (nodeCount(unit) === 1 && unit.nodes[0]!.spouses.length) {
          family.children.forEach(nUnit => {
            if (nUnit.nodes.some(withId(unit.nodes[0]!.spouses[0]!.id))) {
              const xX = [left, getUnitX(family, nUnit) + HALF_SIZE].sort(inAscOrder);
              connectors.push([xX[0]!, mY + HALF_SIZE, xX[1]!, mY + HALF_SIZE]);
            }
          });
        }
      });

      // horizontal above children
      if (positions.length > 1)
        connectors.push([min(positions), mY, max(positions), mY]);

      // horizontal between parent(s) and child
      else if (positions.length === 1 && pX !== positions[0])
        connectors.push([Math.min(pX, positions[0]!), mY, Math.max(pX, positions[0]!), mY]);

      return connectors;
    }, [])
);
