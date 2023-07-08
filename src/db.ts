import Dexie, { Table } from 'dexie';

type Nullable<T> = T | null;

export interface Todo {
  id?: number;
  title: string;
  createdAt: Nullable<Date>,
  completedAt: Nullable<Date>,
}

export class TodoDexie extends Dexie {
  todos!: Table<Todo>; 

  constructor() {
    super('todo');
    this.version(1).stores({
      todos: '++id, title, createdAt, completedAt'
    });
  }
}

export const db = new TodoDexie();