import { types, Instance } from "mobx-state-tree"

export const TodoItem = types.model('TodoItem', {
    id: types.identifierNumber,
    title: types.string,
    isCompleted: types.boolean,
}).actions(self => ({
    setIsCompleted() {
        self.isCompleted = !self.isCompleted;
    }
}))

export interface ITodoItem extends Instance<typeof TodoItem> {}

export const TodoList = types.model('TodoList', {
    items: types.optional(types.array(TodoItem), [])
}).views(self => ({
    get completed() {
        return self.items.filter(x => x.isCompleted);
    },
    get incompleted() {
        return self.items.filter(x => !x.isCompleted);
    },
    get completeCount() {
        return self.completed.length;
    },
    get incompleteCount() {
        return self.incompleted.length;
    }
})).actions(self => ({
    addTodo(todo: ITodoItem) {
        self.items.push(todo);
    }
}))