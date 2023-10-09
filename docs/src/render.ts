import { SIZE } from '../../src/constants';
import { heightOf, widthOf } from '../../src/utils/family';
import { Gender, RelData, Size } from '../../src/types';

const X = 40;
const uP = 4; // unit padding
const nP = 10; // node padding
const FONT_SIZE = 10;

interface IRenderOptions {
  root: string;
  debug: boolean;
}

function getRandomColor() {
  return '#' + (((1 << 24) * Math.random()) | 0).toString(16);
}

function setupCanvas(canvas: HTMLCanvasElement, size: Size) {
  const ratio = window.devicePixelRatio || 1;

  const width = size.width * X;
  const height = size.height * X;

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, width, height);
  ctx.scale(ratio, ratio);

  return ctx;
}

export function draw(
  canvas: HTMLCanvasElement,
  tree: Readonly<RelData>,
  options: Partial<Readonly<IRenderOptions>> = {},
) {
  const ctx = setupCanvas(canvas, tree.canvas);

  ctx.lineWidth = 1;

  tree.connectors.forEach((points) => {
    const [x1, y1, x2, y2] = points;
    ctx.beginPath();
    ctx.moveTo(x1 * X, y1 * X);
    ctx.lineTo(x2 * X, y2 * X);
    ctx.stroke();
  });

  ctx.setLineDash([5, 3]);
  ctx.font = `${FONT_SIZE}px/1 serif`;

  if (options.debug) {
    tree.families.forEach((family) => {
      const x = family.X * X;
      const y = family.Y * X;
      const color = getRandomColor();

      ctx.beginPath();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = color;
      ctx.rect(x, y, widthOf(family) * X, heightOf(family) * X);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.fillText(family.id.toString(10), x + uP, y + FONT_SIZE + uP);

      if (family.type === 'root' || family.type === 'parent') {
        family.parents.forEach((unit) => {
          ctx.beginPath();
          ctx.rect((family.X + unit.pos) * X + uP, y + uP, unit.nodes.length * SIZE * X - uP * 2, X * SIZE - uP * 2);
          ctx.stroke();
        });
      }

      if (family.type === 'root' || family.type === 'child') {
        family.children.forEach((unit) => {
          ctx.beginPath();
          ctx.rect(
            (family.X + unit.pos) * X + uP,
            y + uP + (family.parents.length ? X * SIZE : 0),
            unit.nodes.length * SIZE * X - uP * 2,
            X * SIZE - uP * 2,
          );
          ctx.stroke();
        });
      }
    });
  }

  tree.nodes.forEach((node) => {
    const { left, top } = node;

    const x = left * X;
    const y = top * X;

    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.fillStyle = node.gender === Gender.male ? '#eee' : '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = node.id === options.root ? 2 : 1;
    ctx.rect(x + nP, y + nP, SIZE * X - nP * 2, SIZE * X - nP * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(node.id, x + X, y + X);

    if (node.hasSubTree) {
      ctx.beginPath();
      ctx.arc(x + X * SIZE - nP, y + nP, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}
