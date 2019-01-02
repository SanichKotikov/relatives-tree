import Family from './models/family';

export type Gender = 'male' | 'female';
export type RelationType = 'blood' | 'married' | 'divorced' | 'adopted';
export type FamilyType = 'root' | 'child' | 'parent';

export interface ICanvasSize {
  width: number;
  height: number;
}

export interface IRelation {
  id: string;
  type: RelationType;
}

export interface IFamilyNode {
  id: string;
  gender: Gender;
  parents: IRelation[];
  children: IRelation[];
  siblings: IRelation[];
  spouses: IRelation[];
  placeholder?: boolean;
}

export interface IConnector {
  points: [number, number, number, number];
}

export interface IFamilyData {
  canvas: ICanvasSize;
  families: Family[];
  connectors: IConnector[];
}
