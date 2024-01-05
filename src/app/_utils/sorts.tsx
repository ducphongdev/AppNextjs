import { Cards, Columns, Items } from '../_types/board.type';

export const mapOrder = (originalArray: any, orderArray: string[] | undefined, key: string) => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a: any, b: any) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};
