import { prop, max } from './index';
import Family from '../models/family';
import { ICanvasSize } from '../types';

export default (families: Family[]): ICanvasSize => ({
  width: max(families.map(prop('right'))),
  height: max(families.map(prop('top'))) + 4,
});
