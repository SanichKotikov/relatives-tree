import calcTree from '../../src';
import type { Node } from '../../src/types';
import empty from '../../samples/empty.json';
import couple from '../../samples/couple.json';
import simple from '../../samples/simple-family.json';
import diff from '../../samples/diff-parents.json';
import divorced from '../../samples/divorced-parents.json';
import spouses from '../../samples/several-spouses.json';
import spouses2 from '../../samples/several-spouses-n2.json';
import testTree1 from '../../samples/test-tree-n1.json';
import testTree2 from '../../samples/test-tree-n2.json';
import testTree3 from '../../samples/test-tree-n3.json';
import testTree4 from '../../samples/test-tree-n4.json';
import average from '../../samples/average-tree.json';
import { draw } from './render';

const content = document.getElementById('content');
if (!content) throw new Error('There is no content element');

const data: readonly { id: string; nodes: any[] }[] = [
  { id: 'gRstruEr4', nodes: empty },
  { id: 'jsyRsE5sr', nodes: couple },
  { id: 'dyTpfj6sr', nodes: simple },
  { id: 'dyTpfj6st', nodes: diff },
  { id: 'user4', nodes: divorced },
  { id: 'js2RsE5sr', nodes: spouses },
  { id: 'uJK9', nodes: testTree2 },
  { id: '957875050', nodes: spouses2 },
  { id: 'aeqW', nodes: testTree1 },
  { id: 'kuVISwh7w', nodes: average },
  { id: 'PXACjDxmR', nodes: average },
  { id: 'UIEjvLJMd', nodes: average },
  { id: 'RZbkr5vAi', nodes: average },
  { id: 'Fbc9iwnJl', nodes: average },
  { id: '2DlrR0fK8', nodes: average },
  { id: '1', nodes: testTree3 },
  { id: '1', nodes: testTree4 },
];

function drawTree(el: HTMLElement, nodes: Node[], rootId: string) {
  const canvas = document.createElement('canvas');
  const tree = calcTree(nodes, { rootId });

  el.append(canvas);
  draw(canvas, tree, { root: rootId, debug: false });
}

data.forEach(({ id, nodes }) => {
  drawTree(content, nodes, id);
});
