import { prop, withType, flat, unique } from '../utils';
import Family from '../models/family';
import { IConnector } from '../types';

export default (families: Family[]): IConnector[] => {
  const connectors: IConnector[] = [];

  families.filter(withType('parent')).forEach(family => {
    family.pUnits.forEach(pUnit => {
      const pX = family.left + pUnit.shift + (pUnit.size); // TODO
      const pY = family.top + 1;
      const mY = family.top + 2;

      // between parents
      if (pUnit.size === 2) {
        connectors.push({
          points: [pX - 1, pY, pX - 1 + 2, pY],
        });
      }

      // from parent(s) to child
      connectors.push({
        points: [pX, pY, pX, mY],
      });

      const ids = pUnit.nodes
        .map(prop('children'))
        .reduce(flat)
        .map(prop('id'))
        .filter(unique);

      family.cUnits.forEach(cUnit => {
        const cIndex = cUnit.nodes.findIndex(node => ids.indexOf(node.id) !== -1);
        const cX = family.left + cUnit.shift + (cIndex * 2) + 1;

        // from child to parent(s)
        connectors.push({
          points: [cX, mY, cX, mY + 1],
        });

        if (pX !== cX) {
          // horizontal between parent(s) and child
          connectors.push({
            points: [Math.min(pX, cX), mY, Math.max(pX, cX), mY],
          });
        }
      });
    });
  });

  return connectors;
};
