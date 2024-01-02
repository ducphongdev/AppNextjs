import { Cards, Columns } from "../_types/board.type";

export const mapOrder = (
  originalArray: Columns[] | Cards[],
  orderArray: string[],
  key: string
) => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a: any, b: any) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};
