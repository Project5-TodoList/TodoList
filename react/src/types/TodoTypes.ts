export interface TodoItem {
  _id: string;
  title: string;
  content: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
  imagePath?: string;
}

export const defaultTodoItem: TodoItem = {
  _id: '',
  title: '',
  content: '',
  done: false,
  createdAt: '',
  updatedAt: '',
};
