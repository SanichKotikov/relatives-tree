import { Family, ICanvasSize } from '../types';
import { max } from './index';
import { fRight, heightOf } from './family';

export default (families: ReadonlyArray<Family>): ICanvasSize => {
  return {
    width: max(families.map(fRight)),
    height: max(families.map(family => family.top + heightOf(family))),
  };
};
