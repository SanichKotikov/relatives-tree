import { Family, IFamilyNode, IFamilyData } from './src/types';

export {
  Gender,
  RelationType,
  FamilyType,
  Family,
  Unit,
  ICanvasSize,
  IRelation,
  IFamilyNode,
  IConnector,
  IFamilyData,
} from './src/types';

declare const hasHiddenRelatives: (family: Family, node: IFamilyNode) => boolean;
export { hasHiddenRelatives };

export default function (nodes: IFamilyNode[], rootId: string): IFamilyData;
