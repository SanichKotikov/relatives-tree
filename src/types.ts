export const enum Gender {
  male = 'male',
  female = 'female',
}

export const enum RelationType {
  blood = 'blood',
  married = 'married',
  divorced = 'divorced',
  adopted = 'adopted',
  half = 'half',
}

export const enum FamilyType {
  root = 'root',
  child = 'child',
  parent = 'parent',
}

export interface Family {
  readonly id: number;
  readonly type: FamilyType;
  readonly main: boolean;
  /** Parent family ID */
  pid?: number;
  /** Child family ID */
  cid?: number;
  /** Family's left coordinate */
  X: number;
  /** Family's top coordinate */
  Y: number;
  parents: readonly Unit[];
  children: readonly Unit[];
}

export interface Unit {
  /** Family ID */
  readonly fid: number;
  /** Is child unit */
  readonly child: boolean;
  readonly nodes: readonly IFamilyNode[];
  pos: number;
}

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
  parents: readonly IRelation[];
  children: readonly IRelation[];
  siblings: readonly IRelation[];
  spouses: readonly IRelation[];
  placeholder?: boolean;
}

export interface IFamilyExtNode extends IFamilyNode {
  top: number;
  left: number;
  hasSubTree: boolean;
}

export interface IConnector {
  points: [number, number, number, number];
}

export interface IFamilyData {
  canvas: ICanvasSize;
  families: readonly Family[];
  nodes: readonly IFamilyExtNode[];
  connectors: readonly IConnector[];
}

export interface IOptions {
  rootId: string;
  placeholders?: boolean;
}
