import type { Family, Size } from '../types';
import { max } from './index';
import { bottomOf, rightOf } from './family';

export const getCanvasSize = (families: readonly Family[]): Size => ({
  width: max(families.map(rightOf)),
  height: max(families.map(bottomOf)),
});
