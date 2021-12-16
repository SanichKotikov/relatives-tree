import { test } from 'uvu';
import { equal } from 'uvu/assert';

import calcTree from '../src';
import type { ExtNode, Family } from '../src/types';
import { rightOf, widthOf } from '../src/utils/family';
import empty from '../samples/empty.json';
import couple from '../samples/couple.json';
import simple from '../samples/simple-family.json';
import diff from '../samples/diff-parents.json';
import divorced from '../samples/divorced-parents.json';
import spouses from '../samples/several-spouses.json';
import spouses2 from '../samples/several-spouses-n2.json';
import testTree1 from '../samples/test-tree-n1.json';
import testTree2 from '../samples/test-tree-n2.json';
import average from '../samples/average-tree.json';

type ResultObj = { [id: string]: boolean | string };

const emptyTree = calcTree(empty as any, { rootId: 'gRstruEr4' });
const coupleTree = calcTree(couple as any, { rootId: 'jsyRsE5sr' });
const simpleTree = calcTree(simple as any, { rootId: 'dyTpfj6sr' });
const diffTree = calcTree(diff as any, { rootId: 'dyTpfj6st' });
const divorcedTree = calcTree(divorced as any, { rootId: 'user4' });
const spousesTree = calcTree(spouses as any, { rootId: 'js2RsE5sr' });
const spousesTreeN2 = calcTree(spouses2 as any, { rootId: '957875050' });
const testTreeN1 = calcTree(testTree1 as any, { rootId: 'aeqW' });
const testTreeN2 = calcTree(testTree2 as any, { rootId: 'uJK9' });
const average1 = calcTree(average as any, { rootId: 'kuVISwh7w' });
const average2 = calcTree(average as any, { rootId: 'PXACjDxmR' });
const average3 = calcTree(average as any, { rootId: 'UIEjvLJMd' });
const average4 = calcTree(average as any, { rootId: 'RZbkr5vAi' });
const average5 = calcTree(average as any, { rootId: 'Fbc9iwnJl' });
const average6 = calcTree(average as any, { rootId: '2DlrR0fK8' });

test('Canvas size', () => {
  equal(emptyTree.canvas, { width: 2, height: 2 });
  equal(coupleTree.canvas, { width: 4, height: 2 });
  equal(simpleTree.canvas, { width: 4, height: 4 });
  equal(diffTree.canvas, { width: 6, height: 4 });
  equal(divorcedTree.canvas, { width: 6, height: 6 });
  equal(spousesTree.canvas, { width: 6, height: 2 });
  equal(testTreeN1.canvas, { width: 16, height: 8 });
  equal(testTreeN2.canvas, { width: 6, height: 4 });
  equal(average1.canvas, { width: 18, height: 12 });
  equal(average2.canvas, { width: 20, height: 10 });
  equal(average3.canvas, { width: 18, height: 12 });
  equal(average4.canvas, { width: 8, height: 6 });
  equal(average5.canvas, { width: 14, height: 10 });
  equal(average6.canvas, { width: 20, height: 10 });
});

test('Connectors', () => {
  equal(emptyTree.connectors, []);
  equal(coupleTree.connectors, [
    [1, 1, 3, 1],
  ]);
  equal(simpleTree.connectors, [
    [2, 1, 2, 2],
    [1, 2, 1, 3],
    [3, 2, 3, 3],
    [1, 2, 3, 2],
  ]);
  equal(diffTree.connectors, [
    [1, 1, 3, 1],
    [3, 1, 5, 1],
    [4, 1, 4, 2],
    [4, 2, 4, 3],
  ]);
  equal(divorcedTree.connectors, [
    [1, 1, 3, 1],
    [1, 1, 5, 1],
    [2, 1, 2, 2],
    [1, 2, 1, 3],
    [3, 2, 3, 3],
    [1, 2, 3, 2],
    [1, 3, 1, 4],
    [1, 4, 1, 5],
  ]);
  equal(spousesTree.connectors, [
    [1, 1, 3, 1],
    [3, 1, 5, 1],
  ]);
  equal(testTreeN1.connectors, [
    [2, 1, 11, 1],
    [11, 1, 13, 1],
    [2, 1, 2, 2],
    [1, 2, 1, 3],
    [1, 3, 3, 3],
    [1, 2, 2, 2],
    [12, 1, 12, 2],
    [10, 2, 10, 3],
    [8, 3, 10, 3],
    [15, 2, 15, 3],
    [10, 2, 15, 2],
    [9, 3, 9, 4],
    [6, 4, 6, 5],
    [9, 4, 9, 5],
    [11, 4, 11, 5],
    [13, 4, 13, 5],
    [6, 4, 13, 4],
    [6, 5, 6, 6],
    [7, 6, 7, 7],
    [5, 7, 7, 7],
    [6, 6, 7, 6],
  ]);
  equal(testTreeN2.connectors, [
    [1, 1, 3, 1],
    [3, 1, 5, 1],
    [1, 1, 1, 2],
    [1, 2, 1, 3],
  ]);
  equal(average1.connectors, [
    [5, 3, 7, 3],
    [6, 3, 6, 4],
    [7, 4, 7, 5],
    [6, 4, 7, 4],
    [11, 3, 11, 4],
    [9, 4, 9, 5],
    [9, 4, 11, 4],
    [3, 1, 5, 1],
    [4, 1, 4, 2],
    [5, 2, 5, 3],
    [4, 2, 5, 2],
    [7, 1, 9, 1],
    [8, 1, 8, 2],
    [7, 2, 7, 3],
    [7, 2, 8, 2],
    [7, 5, 9, 5],
    [8, 5, 8, 6],
    [1, 6, 1, 7],
    [3, 6, 3, 7],
    [3, 7, 5, 7],
    [11, 6, 11, 7],
    [9, 7, 11, 7],
    [15, 6, 15, 7],
    [15, 7, 17, 7],
    [1, 6, 15, 6],
    [4, 7, 4, 8],
    [4, 8, 4, 9],
    [10, 7, 10, 8],
    [7, 8, 7, 9],
    [11, 8, 11, 9],
    [9, 9, 11, 9],
    [13, 8, 13, 9],
    [7, 8, 13, 8],
    [10, 9, 10, 10],
    [10, 10, 10, 11],
  ]);
  equal(average2.connectors, [
    [13, 1, 13, 2],
    [8, 2, 8, 3],
    [8, 3, 10, 3],
    [19, 2, 19, 3],
    [8, 2, 19, 2],
    [9, 3, 9, 4],
    [1, 4, 1, 5],
    [5, 4, 5, 5],
    [3, 5, 5, 5],
    [9, 4, 9, 5],
    [9, 5, 11, 5],
    [17, 4, 17, 5],
    [15, 5, 17, 5],
    [1, 4, 17, 4],
    [4, 5, 4, 6],
    [4, 6, 4, 7],
    [10, 5, 10, 6],
    [7, 6, 7, 7],
    [9, 6, 9, 7],
    [9, 7, 11, 7],
    [13, 6, 13, 7],
    [7, 6, 13, 6],
    [10, 7, 10, 8],
    [10, 8, 10, 9],
  ]);
  equal(average3.connectors, [
    [6, 3, 6, 4],
    [8, 4, 8, 5],
    [6, 4, 8, 4],
    [10, 3, 12, 3],
    [11, 3, 11, 4],
    [10, 4, 10, 5],
    [10, 4, 11, 4],
    [8, 1, 10, 1],
    [9, 1, 9, 2],
    [10, 2, 10, 3],
    [9, 2, 10, 2],
    [12, 1, 14, 1],
    [13, 1, 13, 2],
    [12, 2, 12, 3],
    [12, 2, 13, 2],
    [8, 5, 10, 5],
    [9, 5, 9, 6],
    [1, 6, 1, 7],
    [5, 6, 5, 7],
    [3, 7, 5, 7],
    [9, 6, 9, 7],
    [9, 7, 11, 7],
    [17, 6, 17, 7],
    [15, 7, 17, 7],
    [1, 6, 17, 6],
    [4, 7, 4, 8],
    [4, 8, 4, 9],
    [10, 7, 10, 8],
    [7, 8, 7, 9],
    [9, 8, 9, 9],
    [9, 9, 11, 9],
    [13, 8, 13, 9],
    [7, 8, 13, 8],
    [10, 9, 10, 10],
    [10, 10, 10, 11],
  ]);
  equal(average4.connectors, [
    [3, 1, 5, 1],
    [4, 1, 4, 2],
    [1, 2, 1, 3],
    [5, 2, 5, 3],
    [3, 3, 5, 3],
    [7, 2, 7, 3],
    [1, 2, 7, 2],
    [4, 3, 4, 4],
    [4, 4, 4, 5],
  ]);
  equal(average5.connectors, [
    [1, 5, 3, 5],
    [2, 5, 2, 6],
    [4, 6, 4, 7],
    [2, 6, 4, 6],
    [7, 5, 9, 5],
    [8, 5, 8, 6],
    [6, 6, 6, 7],
    [6, 6, 8, 6],
    [5, 3, 5, 4],
    [7, 4, 7, 5],
    [5, 4, 7, 4],
    [9, 3, 11, 3],
    [10, 3, 10, 4],
    [9, 4, 9, 5],
    [9, 4, 10, 4],
    [7, 1, 9, 1],
    [8, 1, 8, 2],
    [9, 2, 9, 3],
    [8, 2, 9, 2],
    [11, 1, 13, 1],
    [12, 1, 12, 2],
    [11, 2, 11, 3],
    [11, 2, 12, 2],
    [4, 7, 6, 7],
    [5, 7, 5, 8],
    [5, 8, 5, 9],
  ]);
  equal(average6.connectors, [
    [14, 1, 14, 2],
    [9, 2, 9, 3],
    [7, 3, 9, 3],
    [19, 2, 19, 3],
    [9, 2, 19, 2],
    [8, 3, 8, 4],
    [1, 4, 1, 5],
    [3, 4, 3, 5],
    [3, 5, 5, 5],
    [11, 4, 11, 5],
    [9, 5, 11, 5],
    [15, 4, 15, 5],
    [15, 5, 17, 5],
    [1, 4, 15, 4],
    [4, 5, 4, 6],
    [4, 6, 4, 7],
    [10, 5, 10, 6],
    [7, 6, 7, 7],
    [11, 6, 11, 7],
    [9, 7, 11, 7],
    [13, 6, 13, 7],
    [7, 6, 13, 6],
    [10, 7, 10, 8],
    [10, 8, 10, 9],
  ]);
});

test('Family size & position', () => {
  function convert(families: ReadonlyArray<Family>) {
    return families.map(f => [f.id, f.Y, f.X, rightOf(f), widthOf(f)].join('|'));
  }

  equal(convert(emptyTree.families), ['1|0|0|2|2']);
  equal(convert(coupleTree.families), ['1|0|0|4|4']);
  equal(convert(simpleTree.families), ['1|0|1|3|2', '2|0|0|4|4']);
  equal(convert(diffTree.families), ['2|0|0|2|2', '1|0|2|6|4']);
  equal(convert(divorcedTree.families), ['1|0|0|4|4', '2|0|4|6|2', '3|2|0|2|2']);
  equal(convert(spousesTree.families), ['1|0|0|6|6']);
  equal(convert(spousesTreeN2.families), [
    '1|0|2|14|12',
    '2|0|1|5|4',
    '3|2|0|6|6',
    '4|4|0|4|4',
    '5|0|6|10|4',
    '6|2|6|10|4',
    '7|0|10|14|4',
  ]);
  equal(convert(testTreeN1.families), [
    '1|0|1|14|13',
    '2|0|0|4|4',
    '3|0|7|16|9',
    '4|2|5|14|9',
    '5|4|4|8|4',
  ]);
  equal(convert(testTreeN2.families), ['1|0|0|6|6', '2|0|0|2|2', '3|0|2|6|4']);
  equal(convert(average1.families), [
    '1|4|0|18|18',
    '2|2|4|12|8',
    '3|0|2|10|8',
    '4|6|2|6|4',
    '5|6|6|14|8',
    '6|8|8|12|4',
  ]);
  equal(convert(average2.families), ['1|0|7|20|13', '2|2|0|18|18', '3|4|2|6|4', '4|4|6|14|8', '5|6|8|12|4']);
  equal(convert(average3.families), [
    '1|4|0|18|18',
    '2|2|5|13|8',
    '3|0|7|15|8',
    '4|6|2|6|4',
    '5|6|6|14|8',
    '6|8|8|12|4',
  ]);
  equal(convert(average4.families), ['1|0|2|6|4', '2|0|0|8|8', '3|2|2|6|4']);
  equal(convert(average5.families), ['1|6|3|7|4', '2|4|0|10|10', '3|2|4|12|8', '4|0|6|14|8']);
  equal(convert(average6.families), [
    '1|0|13|15|2',
    '2|0|6|20|14',
    '3|2|0|18|18',
    '4|4|2|6|4',
    '5|4|6|14|8',
    '6|6|8|12|4',
  ]);
});

test('Node position', () => {
  function convert(nodes: ReadonlyArray<ExtNode>) {
    return nodes.reduce((res: ResultObj, n) => {
      res[n.id] = [n.top, n.left].join('|');
      return res;
    }, {});
  }

  equal(convert(emptyTree.nodes), {
    'gRstruEr4': '0|0',
  });
  equal(convert(coupleTree.nodes), {
    'jsyRsE5sr': '0|0',
    'pdRwdtR54': '0|2',
  });
  equal(convert(simpleTree.nodes), {
    'dyTpfj6sr': '0|1',
    'ahfR5lR2s': '2|0',
    'aoF9dn5Ew': '2|2',
  });
  equal(convert(diffTree.nodes), {
    'ahfR5lR2s': '0|0',
    'aoF9dn5Ew': '0|2',
    'dyTpfj6st': '2|3',
    'tdRwdtR54': '0|4',
  });
  equal(convert(divorcedTree.nodes), {
    'user1': '2|0',
    'user2': '0|4',
    'user3': '4|0',
    'user4': '2|2',
    'user5': '0|2',
    'user6': '0|0',
  });
  equal(convert(spousesTree.nodes), {
    'js2RsE5sr': '0|2',
    'pdRwdtR54': '0|4',
    'tdRwdtR54': '0|0',
  });
  equal(convert(testTreeN1.nodes), {
    '13Uo': '4|12',
    '5ejU': '2|7',
    'MEHb': '4|8',
    'YzLf': '2|9',
    '_qhe': '6|4',
    'aCZW': '0|1',
    'aeqW': '0|10',
    'c3EI': '4|5',
    'l8un': '2|2',
    'lhDs': '4|10',
    's9HE': '2|0',
    'uJK9': '2|14',
    'wIFr': '0|12',
    'yZwk': '6|6',
  });
  equal(convert(testTreeN2.nodes), { aCZW: '0|0', uJK9: '0|2', wIFr: '0|4', s9HE: '2|0' });
  equal(convert(average1.nodes), {
    '011jVS4rb': '4|6',
    'PXACjDxmR': '4|8',
    'HkqEDLvxE': '6|0',
    'kuVISwh7w': '6|2',
    'vRSjcaDGj': '6|4',
    'RZbkr5vAi': '6|8',
    'UIEjvLJMd': '6|10',
    'ZVi8fWDBx': '6|14',
    'wJ1EBvc5m': '6|16',
    'ypu71w9_Q': '2|4',
    'GEf8zF7A4': '2|6',
    '2DlrR0fK8': '2|10',
    'TsyAkbF89': '0|2',
    'T54Km7uOC': '0|4',
    'gsgwGS_Kw': '0|6',
    'ZgTZx9uXQ': '0|8',
    'Fbc9iwnJl': '8|3',
    '6_OTJvbvS': '8|6',
    'ilad8NH6g': '8|8',
    'JhSCcdFEP': '8|10',
    '6hNxNY1-I': '8|12',
    'Z0QA5oKks': '10|9',
  });
  equal(convert(average2.nodes), {
    '2DlrR0fK8': '0|12',
    'PXACjDxmR': '2|7',
    '011jVS4rb': '2|9',
    'H-06WvsfJ': '2|18',
    'HkqEDLvxE': '4|0',
    'vRSjcaDGj': '4|2',
    'kuVISwh7w': '4|4',
    'UIEjvLJMd': '4|8',
    'RZbkr5vAi': '4|10',
    'wJ1EBvc5m': '4|14',
    'ZVi8fWDBx': '4|16',
    'Fbc9iwnJl': '6|3',
    '6_OTJvbvS': '6|6',
    'JhSCcdFEP': '6|8',
    'ilad8NH6g': '6|10',
    '6hNxNY1-I': '6|12',
    'Z0QA5oKks': '8|9',
  });
  equal(convert(average3.nodes), {
    'PXACjDxmR': '4|7',
    '011jVS4rb': '4|9',
    'HkqEDLvxE': '6|0',
    'vRSjcaDGj': '6|2',
    'kuVISwh7w': '6|4',
    'UIEjvLJMd': '6|8',
    'RZbkr5vAi': '6|10',
    'wJ1EBvc5m': '6|14',
    'ZVi8fWDBx': '6|16',
    '2DlrR0fK8': '2|5',
    'GEf8zF7A4': '2|9',
    'ypu71w9_Q': '2|11',
    'ZgTZx9uXQ': '0|7',
    'gsgwGS_Kw': '0|9',
    'T54Km7uOC': '0|11',
    'TsyAkbF89': '0|13',
    'Fbc9iwnJl': '8|3',
    '6_OTJvbvS': '8|6',
    'JhSCcdFEP': '8|8',
    'ilad8NH6g': '8|10',
    '6hNxNY1-I': '8|12',
    'Z0QA5oKks': '10|9',
  });
  equal(convert(average4.nodes), {
    'RZbkr5vAi': '0|2',
    'UIEjvLJMd': '0|4',
    '6_OTJvbvS': '2|0',
    'ilad8NH6g': '2|2',
    'JhSCcdFEP': '2|4',
    '6hNxNY1-I': '2|6',
    'Z0QA5oKks': '4|3',
  });
  equal(convert(average5.nodes), {
    'vRSjcaDGj': '6|3',
    'kuVISwh7w': '6|5',
    'Fbc9iwnJl': '8|4',
    'iFiwqrWx-': '4|0',
    '6vASIIxhd': '4|2',
    'PXACjDxmR': '4|6',
    '011jVS4rb': '4|8',
    '2DlrR0fK8': '2|4',
    'GEf8zF7A4': '2|8',
    'ypu71w9_Q': '2|10',
    'ZgTZx9uXQ': '0|6',
    'gsgwGS_Kw': '0|8',
    'T54Km7uOC': '0|10',
    'TsyAkbF89': '0|12',
  });
  equal(convert(average6.nodes), {
    '2DlrR0fK8': '0|13',
    '011jVS4rb': '2|6',
    'PXACjDxmR': '2|8',
    'H-06WvsfJ': '2|18',
    'HkqEDLvxE': '4|0',
    'kuVISwh7w': '4|2',
    'vRSjcaDGj': '4|4',
    'RZbkr5vAi': '4|8',
    'UIEjvLJMd': '4|10',
    'ZVi8fWDBx': '4|14',
    'wJ1EBvc5m': '4|16',
    'Fbc9iwnJl': '6|3',
    '6_OTJvbvS': '6|6',
    'ilad8NH6g': '6|8',
    'JhSCcdFEP': '6|10',
    '6hNxNY1-I': '6|12',
    'Z0QA5oKks': '8|9',
  });
});

test('Node sub tree', () => {
  function convert(nodes: ReadonlyArray<ExtNode>) {
    return nodes.reduce((res: ResultObj, n) => {
      res[n.id] = n.hasSubTree;
      return res;
    }, {});
  }

  equal(convert(emptyTree.nodes), {
    'gRstruEr4': false,
  });
  equal(convert(coupleTree.nodes), {
    'jsyRsE5sr': false,
    'pdRwdtR54': false,
  });
  equal(convert(simpleTree.nodes), {
    'dyTpfj6sr': false,
    'ahfR5lR2s': false,
    'aoF9dn5Ew': false,
  });
  equal(convert(simpleTree.nodes), {
    'ahfR5lR2s': false,
    'aoF9dn5Ew': false,
    'dyTpfj6sr': false,
  });
  equal(convert(spousesTree.nodes), {
    'js2RsE5sr': false,
    'pdRwdtR54': false,
    'tdRwdtR54': false,
  });
  equal(convert(testTreeN1.nodes), {
    aCZW: false,
    aeqW: false,
    wIFr: false,
    s9HE: false,
    l8un: false,
    '5ejU': false,
    YzLf: false,
    uJK9: false,
    c3EI: false,
    MEHb: false,
    lhDs: false,
    '13Uo': false,
    _qhe: false,
    yZwk: false,
  });
  equal(convert(testTreeN2.nodes), { aCZW: false, uJK9: false, wIFr: false, s9HE: false });
  equal(convert(average1.nodes), {
    '011jVS4rb': false,
    'PXACjDxmR': false,
    'HkqEDLvxE': false,
    'kuVISwh7w': false,
    'vRSjcaDGj': true,
    'RZbkr5vAi': false,
    'UIEjvLJMd': false,
    'ZVi8fWDBx': false,
    'wJ1EBvc5m': false,
    'ypu71w9_Q': false,
    'GEf8zF7A4': false,
    '2DlrR0fK8': true,
    'TsyAkbF89': false,
    'T54Km7uOC': false,
    'gsgwGS_Kw': false,
    'ZgTZx9uXQ': false,
    'Fbc9iwnJl': false,
    '6_OTJvbvS': false,
    'ilad8NH6g': false,
    'JhSCcdFEP': false,
    '6hNxNY1-I': false,
    'Z0QA5oKks': false,
  });
  equal(convert(average2.nodes), {
    '2DlrR0fK8': false,
    'PXACjDxmR': false,
    '011jVS4rb': true,
    'H-06WvsfJ': false,
    'HkqEDLvxE': false,
    'vRSjcaDGj': true,
    'kuVISwh7w': false,
    'UIEjvLJMd': false,
    'RZbkr5vAi': false,
    'wJ1EBvc5m': false,
    'ZVi8fWDBx': false,
    'Fbc9iwnJl': false,
    '6_OTJvbvS': false,
    'JhSCcdFEP': false,
    'ilad8NH6g': false,
    '6hNxNY1-I': false,
    'Z0QA5oKks': false,
  });
  equal(convert(average3.nodes), {
    'PXACjDxmR': false,
    '011jVS4rb': false,
    'HkqEDLvxE': false,
    'vRSjcaDGj': true,
    'kuVISwh7w': false,
    'UIEjvLJMd': false,
    'RZbkr5vAi': false,
    'wJ1EBvc5m': false,
    'ZVi8fWDBx': false,
    '2DlrR0fK8': true,
    'GEf8zF7A4': false,
    'ypu71w9_Q': false,
    'ZgTZx9uXQ': false,
    'gsgwGS_Kw': false,
    'T54Km7uOC': false,
    'TsyAkbF89': false,
    'Fbc9iwnJl': false,
    '6_OTJvbvS': false,
    'JhSCcdFEP': false,
    'ilad8NH6g': false,
    '6hNxNY1-I': false,
    'Z0QA5oKks': false,
  });
  equal(convert(average4.nodes), {
    'RZbkr5vAi': false,
    'UIEjvLJMd': true,
    '6_OTJvbvS': false,
    'ilad8NH6g': false,
    'JhSCcdFEP': false,
    '6hNxNY1-I': false,
    'Z0QA5oKks': false,
  });
  equal(convert(average5.nodes), {
    'vRSjcaDGj': false,
    'kuVISwh7w': false,
    'Fbc9iwnJl': false,
    'iFiwqrWx-': false,
    '6vASIIxhd': false,
    'PXACjDxmR': true,
    '011jVS4rb': true,
    '2DlrR0fK8': true,
    'GEf8zF7A4': false,
    'ypu71w9_Q': false,
    'ZgTZx9uXQ': false,
    'gsgwGS_Kw': false,
    'T54Km7uOC': false,
    'TsyAkbF89': false,
  });
  equal(convert(average6.nodes), {
    '2DlrR0fK8': false,
    '011jVS4rb': true,
    'PXACjDxmR': false,
    'H-06WvsfJ': false,
    'HkqEDLvxE': false,
    'kuVISwh7w': false,
    'vRSjcaDGj': true,
    'RZbkr5vAi': false,
    'UIEjvLJMd': false,
    'ZVi8fWDBx': false,
    'wJ1EBvc5m': false,
    'Fbc9iwnJl': false,
    '6_OTJvbvS': false,
    'ilad8NH6g': false,
    'JhSCcdFEP': false,
    '6hNxNY1-I': false,
    'Z0QA5oKks': false,
  });
});

test.run();
