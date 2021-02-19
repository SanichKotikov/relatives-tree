import { SIZE } from '../constants';
import { Family } from '../types';
import { prop } from './index';
import { unitNodesCount } from './family';

const middle = (values: readonly number[]): number => {
  const result = (values[0] + values[values.length - 1]) / 2;
  return Number.isNaN(result) ? 0 : result;
};

export const arrangeParentsIn = (family: Family) => {
  const pUnit = family.parents[0];
  if (!pUnit) return;

  // TODO: add note about nodes[0]
  const children: readonly string[] = pUnit.nodes[0].children.map(prop('id'));

  const shifts = family.children.reduce<number[]>((result, unit) => {
    const index = unit.nodes.findIndex(node => children.includes(node.id));
    if (index !== -1) result.push(unit.pos + (index * SIZE));
    return result;
  }, []);

  pUnit.pos = Math.floor(middle(shifts) - (unitNodesCount(family.parents) - 1));
};
