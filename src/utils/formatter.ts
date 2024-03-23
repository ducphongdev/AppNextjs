import moment from 'moment';

export const generatePlaceholderCard = (column: any) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
  };
};

export const convertDate = (
  date: string | undefined,
  type: string | undefined
) => {
  if (!date) return '';
  return moment(date)?.format(type);
};
