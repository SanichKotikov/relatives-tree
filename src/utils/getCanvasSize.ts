import { Family, ICanvasSize } from '../types';
import { max } from './index';
import { heightOf, rightOf } from './family';

export default (families: ReadonlyArray<Family>): ICanvasSize => {
  return {
    width: max(families.map(rightOf)),
    height: max(families.map(family => family.Y + heightOf(family))),
  };
};
