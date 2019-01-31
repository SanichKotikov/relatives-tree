import Store from '../store';
import { ICanvasSize } from '../types';

export default (store: Store): ICanvasSize => {
  const rValues: number[] = [];
  const bValues: number[] = [];

  store.familiesArray.forEach((family) => {
    rValues.push(family.left + family.width);
    bValues.push(family.top);
  });

  return {
    width: Math.max.apply(null, rValues),
    height: Math.max.apply(null, bValues) + 4,
  };
}
