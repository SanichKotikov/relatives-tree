import Store from '../store';
import Family from '../models/family';
import arrangeMiddle from '../middle/arrange';

export default (store: Store, family: Family): void => {
  const shift = family.pUnits[0].shift;
  if (shift === 0 || family.pID === null) return;

  let right = 0;

  while (family) {
    const fRight = family.left + family.width;
    right = Math.max(right, fRight);

    const pFamily = store.getFamily(family.pID as number); // TODO

    const fUnit = family.pUnits[0];
    const fShift = fUnit.shift;

    const uIndex = pFamily.cUnits.findIndex(unit => (
      unit.nodes[0].id === fUnit.nodes[0].id
    ));

    if (uIndex === 0) {
      pFamily.left = family.left + fShift;
    } else {
      const pUnit = pFamily.cUnits.find(unit => unit.isSame(fUnit));
      if (pUnit) pUnit.shift += fShift;
    }

    const next = pFamily.cUnits[uIndex + 1];

    if (next) {
      const diff = right - (pFamily.left + next.shift);

      for (let i = uIndex + 1; i < pFamily.cUnits.length; i++) {
        pFamily.cUnits[i].shift += diff;
      }
    }

    const ppUnit = pFamily.pUnits[0];

    if (ppUnit) {
      const size = pFamily.width;
      ppUnit.shift = Math.floor((size - (2 * ppUnit.size)) / 2);
    }

    if (pFamily.pID === null) {
      const rNodes = [...store.families.values()].filter(f => f.type === 'root');
      const start = rNodes.findIndex(f => f.id === pFamily.id);
      arrangeMiddle(rNodes, start + 1, fRight);
      break;
    }

    family = pFamily;
  }
};
