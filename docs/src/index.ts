import calcTree from '../../src';
import type { Node } from '../../src/types';
import empty from '../../samples/empty.json';
import couple from '../../samples/couple.json';
import simple from '../../samples/simple-family.json';
import diff from '../../samples/diff-parents.json';
import divorced from '../../samples/divorced-parents.json';
import spouses from '../../samples/several-spouses.json';
import testTree1 from '../../samples/test-tree-n1.json';
import testTree2 from '../../samples/test-tree-n2.json';
import average from '../../samples/average-tree.json';
import { draw } from './render';

const content = document.getElementById('content');
if (!content) throw new Error('There is no content element');

const data: { [key: string]: any[] } = {
  'gRstruEr4': empty,
  'jsyRsE5sr': couple,
  'dyTpfj6sr': simple,
  'dyTpfj6st': diff,
  'user4': divorced,
  'js2RsE5sr': spouses,
  'aeqW': testTree1,
  'uJK9': testTree2,
  'kuVISwh7w': average,
  'PXACjDxmR': average,
  'UIEjvLJMd': average,
  'RZbkr5vAi': average,
  'Fbc9iwnJl': average,
  '2DlrR0fK8': average,
};

function drawTree(el: HTMLElement, nodes: Node[], rootId: string) {
  const canvas = document.createElement('canvas');
  const tree = calcTree(nodes, { rootId });

  el.append(canvas);
  draw(canvas, tree, { root: rootId, debug: false });
}

Object.keys(data).forEach(id => {
  drawTree(content, data[id]!, id);
});
