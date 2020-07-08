import Family from '../models/family';
import { ICanvasSize } from '../types';
import { max, prop } from './index';

export default (families: ReadonlyArray<Family>): ICanvasSize => {
  return {
    width: max(families.map(prop('right'))),
    height: max(families.map(family => family.top + family.height)),
  };
};
