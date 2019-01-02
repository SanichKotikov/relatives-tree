import Family from '../models/family';
import { IConnector } from '../types';

export default (families: Family[]): IConnector[] => {
  const connectors: IConnector[] = [];

  families.forEach(family => {
    const mY = family.top + 2;

    // from parent(s) to child
    family.pUnits.forEach(pUnit => {
      const pX = family.left + pUnit.shift + (pUnit.size); // TODO
      const pY = family.top + 1;

      connectors.push({
        points: [pX, pY, pX, mY],
      });
    });

    // TODO
    const parentIds = family.pUnits
      .map(unit => unit.ids)
      .reduce((ids, id) => ids.concat(id), []);

    const cXs: number[] = [];

    family.cUnits.forEach(cUnit => {
      const cX = family.left + cUnit.shift + 1;

      // from child to parent(s)
      cUnit.nodes.forEach((node, index) => {
        if (node.parents.find(rel => parentIds.indexOf(rel.id) !== -1)) {
          const nX = cX + (index * 2);
          cXs.push(nX);
          connectors.push({
            points: [nX, mY, nX, mY + 1],
          });
        }
      });

      // between child and child's spouse
      if (cUnit.size === 2) {
        connectors.push({
          points: [cX, mY + 1, cX + 2, mY + 1],
        });
      } else if (cUnit.size === 1 && cUnit.nodes[0].spouses.length) {
        family.cUnits.forEach(nUnit => {
          if (nUnit.nodes.findIndex(node => node.id === cUnit.nodes[0].spouses[0].id) !== -1) {
            const xX = [cX, family.left + nUnit.shift + 1].sort((a, b) => a - b);
            connectors.push({
              points: [xX[0], mY + 1, xX[1], mY + 1],
            });
          }
        });
      }
    });

    // horizontal above children
    connectors.push({
      points: [Math.min.apply(null, cXs), mY, Math.max.apply(null, cXs), mY],
    });
  });

  return connectors;
};
