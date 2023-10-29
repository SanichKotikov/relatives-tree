import { max } from './index';
import { bottomOf, rightOf } from './family';
export const getCanvasSize = (families) => ({
    width: max(families.map(rightOf)),
    height: max(families.map(bottomOf)),
});
