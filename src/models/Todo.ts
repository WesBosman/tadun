import { types, Instance } from "mobx-state-tree"
import { format, formatDistance } from "date-fns"

export const TodoItem = types.model('TodoItem', {
    id: types.identifierNumber,
    title: types.string,
    isCompleted: types.boolean,
    createdAt: types.optional(types.Date, new Date()),
    completedAt: types.maybeNull(types.Date),
}).views(self => ({
    /**
     * If the to-do item has been completed show how long it took to complete
     * Otherwise show the date it was created
     */
    get date() {
        if (self.isCompleted && self.completedAt !== null) {
            return formatDistance(self.completedAt, self.createdAt);
        }

        return format(self.createdAt, "M/d/yy");
    },
})).actions(self => ({
    setIsCompleted() {
        self.completedAt = new Date();
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