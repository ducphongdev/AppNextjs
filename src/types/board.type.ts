export interface Cards {
  _id: string;
  boardId: string;
  columnId: string;
  title?: string;
  description?: string | null;
  cover?: string | null;
  memberIds?: string[];
  comments?: string[];
  attachments?: string[];
  FE_PlaceholderCard?: boolean;
}

export interface Columns {
  _id: string;
  boardId: string;
  title: string;
  cardOrderIds: string[];
  cards: Cards[];
}

export interface Board {
  _id: string;
  title: string;
  description: string;
  type: string;
  ownerIds: string[];
  memberIds: string[];
  columnOrderIds: string[];
  columns: Columns[];
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
export type Items = Columns | Cards;
