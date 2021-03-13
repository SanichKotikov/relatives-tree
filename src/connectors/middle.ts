import { inAscOrder, withId } from '../utils';
import { getUnitX, nodeCount } from '../utils/units';
import { withType } from '../utils/family';
import { Connector, Family, FamilyType } from '../types';

export const middle = (families: Family[]): Connector[] => {
  const connectors: Connector[] = [];

  families.filter(withType(FamilyType.root)).forEach(family => {
    // between parents
    family.parents.forEach(pUnit => {
      const pX = getUnitX(family, pUnit) + 1;
      const pY = family.Y + 1;

      if (nodeCount(pUnit) === 2) {
        connectors.push([pX, pY, pX + 2, pY]);
      }
      else if (nodeCount(pUnit) === 1 && pUnit.nodes[0].spouses.length) {
        // TODO
        families
          .filter(rFamily => rFamily.id !== family.id)
          .forEach(rFamily => {
            rFamily.parents.forEach(unit => {
              if (unit.nodes.findIndex(withId(pUnit.nodes[0].spouses[0].id)) !== -1) {
                const xX = [pX, getUnitX(rFamily, unit) + 1].sort(inAscOrder);
                connectors.push([xX[0], pY, xX[1], pY]);
              }
            });
          });
      }
    });
  });

  return connectors;
};
