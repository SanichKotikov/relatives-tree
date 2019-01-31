import Family from '../models/family';
import { withId, withType, inAscOrder } from '../utils';
import { IConnector } from '../types';

export default (families: Family[]): IConnector[] => {
  const connectors: IConnector[] = [];

  families.filter(withType('root')).forEach(family => {
    // between parents
    family.pUnits.forEach(pUnit => {
      const pX = family.left + pUnit.shift + 1;
      const pY = family.top + 1;

      if (pUnit.size === 2) {
        connectors.push({
          points: [pX, pY, pX + 2, pY],
        });
      } else if (pUnit.size === 1 && pUnit.nodes[0].spouses.length) {
        // TODO
        families
          .filter(rFamily => rFamily.id !== family.id)
          .forEach(rFamily => {
            rFamily.pUnits.forEach(unit => {
              if (unit.nodes.findIndex(withId(pUnit.nodes[0].spouses[0].id)) !== -1) {
                const xX = [pX, rFamily.left + unit.shift + 1].sort(inAscOrder);
                connectors.push({
                  points: [xX[0], pY, xX[1], pY],
                });
              }
            });
          });
      }
    });
  });

  return connectors;
};
