export interface ICard {
  _id: string;
  boardId: string;
  columnId: string;
  title?: string;
  description?: string | null;
  cover?: string | null;
  memberIds?: string[];
  comments?: string[];
  attachments?: string[];
  start?: string;
  due?: string;
  dueComplete?: boolean;
  FE_PlaceholderCard?: boolean;
}

export interface IColumn {
  _id: string;
  boardId: string;
  title: string;
  cardOrderIds: string[];
  cards: ICard[];
}

export interface IBoard {
  _id: string;
  title: string;
  description: string;
  type: string;
  ownerIds: string[];
  memberIds: string[];
  columnOrderIds: string[];
  columns: IColumn[];
}

export interface IUser {
  _id: string;
  email: string;
  disPlayName: string;
  avatar?: string;
  role: 'client' | 'admin';
  isActive: boolean;
}
export interface AuthState {
  isLoading: boolean;
  isError: boolean;
  messageError: string | undefined;
  user: {} | IUser;
}
export type Items = IColumn | ICard;
