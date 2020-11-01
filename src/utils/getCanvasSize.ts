import { Family, ICanvasSize } from '../types';
import { max } from './index';
import { heightOf, rightOf } from './family';

export const getCanvasSize = (families: ReadonlyArray<Family>): ICanvasSize => ({
  width: max(families.map(rightOf)),
  height: max(families.map(family => family.Y + heightOf(family))),
});
