import { SIZE } from '../constants';
import Family from '../models/family';
import { prop } from './index';

const middle = (values: ReadonlyArray<number>): number => {
  const result = (values[0] + values[values.length - 1]) / 2;
  return Number.isNaN(result) ? 0 : result;
};

export const arrangeParentUnit = (family: Family) => {
  const pUnit = family.pUnits[0];
  if (!pUnit) return;

  // TODO: add note about nodes[0]
  const children: readonly string[] = pUnit.nodes[0].children.map(prop('id'));

  const shifts = family.cUnits.reduce<number[]>((result, unit) => {
    const index = unit.nodes.findIndex(node => children.includes(node.id));
    if (index !== -1) result.push(unit.pos + (index * SIZE));
    return result;
  }, []);

  pUnit.pos = Math.floor(middle(shifts) - (family.pCount - 1));
};
