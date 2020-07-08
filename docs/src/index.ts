import calcTree from '../../src';
import { IFamilyNode } from '../../src/types';
import empty from '../../samples/empty.json';
import couple from '../../samples/couple.json';
import simple from '../../samples/simple-family.json';
import spouses from '../../samples/several-spouses.json';
import average from '../../samples/average-tree.json';
import { draw } from './render';

const content = document.getElementById('content');
if (!content) throw new Error('There is no content element');

const data: { [key: string]: any[] } = {
  'gRstruEr4': empty,
  'jsyRsE5sr': couple,
  'dyTpfj6sr': simple,
  'js2RsE5sr': spouses,
  'kuVISwh7w': average,
  'PXACjDxmR': average,
  'UIEjvLJMd': average,
  'RZbkr5vAi': average,
  'Fbc9iwnJl': average,
  '2DlrR0fK8': average,
};

function drawTree(el: HTMLElement, nodes: IFamilyNode[], rootId: string) {
  const canvas = document.createElement('canvas');
  const tree = calcTree(nodes, { rootId });

  el.append(canvas);
  draw(canvas, tree, { root: rootId, debug: false });
}

Object.keys(data).forEach(id => {
  drawTree(content, data[id], id);
});
