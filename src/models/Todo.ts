import { types, Instance, flow } from "mobx-state-tree"
import { format, formatDistance } from "date-fns"
import { db } from "../db";

export const TodoItem = types.model('TodoItem', {
    id: types.identifierNumber,
    title: types.string,
    createdAt: types.optional(types.Date, new Date()),
    completedAt: types.maybeNull(types.Date),
}).views(self => ({
    get isCompleted() {
        return self.completedAt !== null;
    },
    /**
     * If the to-do item has been completed show how long it took to complete
     * Otherwise show the date it was created
     */
    get date() {
        if (self.completedAt !== null) {
            return formatDistance(self.completedAt, self.createdAt);
        }

        return format(self.createdAt, "M/d/yy");
    },
})).actions(self => ({
    setIsCompleted() {
        if (self.isCompleted) {
            self.completedAt = null;
        } else {
            self.completedAt = new Date();
        }
        db.todos.update(self.id, self)
    }
}))

export interface ITodoItem extends Instance<typeof TodoItem> {}

export const TodoList = types.model('TodoList', {
    items: types.optional(types.array(TodoItem), []),
}).views(self => ({
    get completed() {
        return self.items.filter(x => x.isCompleted);
    },
    get incompleted() {
        return self.items.filter(x => !x.isCompleted);
    }
})).actions(self => {
    const addTodo = (todo: ITodoItem) => {
        self.items.push(todo);
        db.todos.add({title: todo.title, createdAt: todo.createdAt, completedAt: todo.completedAt})
    }
    
    const loadTodos = flow(function*() {
        try {
            self.items = yield db.todos.toArray()
        } catch (error) {
            console.error(error)
        }
    });

    return {
        addTodo,
        loadTodos
    };
})