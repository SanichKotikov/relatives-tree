import { prop } from '../utils';
import { IFamilyNode } from '../types';

class Unit {

  familyId: number;
  isChild: boolean;
  nodes: IFamilyNode[];
  shift: number;

  constructor(familyId: number, nodes: IFamilyNode[], isChild: boolean = false) {
    this.familyId = familyId;
    this.isChild = isChild;
    this.nodes = nodes;
    this.shift = 0;
  }

  get size(): number {
    return this.nodes.length;
  }

  get right(): number {
    return this.shift + (this.size * 2);
  }

  get ids(): string[] {
    return this.nodes.map(prop('id'));
  }

}

export default Unit;
