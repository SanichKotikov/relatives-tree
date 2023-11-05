export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare const enum Gender {
    male = "male",
    female = "female"
}
export declare const enum RelType {
    blood = "blood",
    married = "married",
    divorced = "divorced",
    adopted = "adopted",
    half = "half"
}
export declare const enum FamilyType {
    root = "root",
    child = "child",
    parent = "parent"
}
export type Family = {
    readonly id: number;
    readonly type: FamilyType;
    readonly main: boolean;
    pid?: number;
    cid?: number;
    X: number;
    Y: number;
    parents: readonly Unit[];
    children: readonly Unit[];
};
export type Unit = {
    readonly fid: number;
    readonly child: boolean;
    readonly nodes: readonly Node[];
    pos: number;
};
export type Size = Readonly<{
    width: number;
    height: number;
}>;
export type Relation = Readonly<{
    id: string;
    type: RelType;
}>;
export type Node = Readonly<{
    id: string;
    gender: Gender;
    parents: readonly Relation[];
    children: readonly Relation[];
    siblings: readonly Relation[];
    spouses: readonly Relation[];
    placeholder?: boolean;
}>;
export type ExtNode = Node & Readonly<{
    top: number;
    left: number;
    hasSubTree: boolean;
}>;
export type Connector = readonly [x1: number, y1: number, x2: number, y2: number, payload?: any];
export type RelData = Readonly<{
    canvas: Size;
    families: readonly Family[];
    nodes: readonly ExtNode[];
    connectors: readonly Connector[];
}>;
export type Options = Readonly<{
    rootId: string;
    placeholders?: boolean;
}>;
