export interface ITaskItem {
  _id: string;
  taskId: string;
  cardId: string;
  title: string;
  state: 'incomplete' | 'complete';
}
export interface ITask {
  _id: string;
  boardId: string;
  cardId: string;
  title: string;
  taskItems: ITaskItem[];
  taskItemOrderId: string[];
}
export interface ICard {
  _id: string;
  boardId: string;
  columnId: string;
  badges?: {
    description: boolean;
    taskItems: number;
    taskItemsChecked: number;
    comments: number;
    start: string;
    due: string;
    duComplete: boolean;
  };
  title?: string;
  description?: string | null;
  cover?: string | null;
  memberIds?: string[];
  comments?: string[];
  attachments?: string[];
  taskOrderIds?: string[];
  start?: string;
  due?: string;
  dueComplete?: boolean;
  tasks?: any;
  columns?: IColumn;
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
  prefs?: { full: string; small: string };
  memberIds: string[];
  columnOrderIds: string[];
  columns: IColumn[];
}

export interface IUser {
  _id: string;
  email: string;
  displayName: string;
  avatar?: string;
  role: 'client' | 'admin';
  isActive: boolean;
}
export interface AuthState {
  isLoading: boolean;
  isError: boolean;
  messageError: string | undefined;
  user: IUser | null;
}
export type Items = IColumn | ICard;
