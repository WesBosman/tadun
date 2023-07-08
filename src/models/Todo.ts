import { types, Instance, flow, destroy, getParent, getRoot, ISimpleType } from "mobx-state-tree"
import { format, formatDistance } from "date-fns"
import { db } from "../db";

export const TodoItem = types.model('TodoItem', {
    id: types.identifierNumber,
    title: types.string,
    createdAt: types.optional(types.Date, new Date()),
    completedAt: types.maybeNull(types.Date),
    showActions: false,
}).views(self => ({
    get isCompleted() {
        return self.completedAt !== null;
    },
    get showActionClass() {
        return self.showActions ? 'actions' : '';
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
    delete() {
        getRoot(self).removeTodo(self);
    },
    setShowActions() {
        self.showActions = !self.showActions;
    },
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
    const addTodo = async (title: string) => {
        await db.todos.add({title: title, createdAt: new Date(), completedAt: null})
        self.loadTodos()
    }

    const removeTodo = (todo: ITodoItem) => {
        db.todos.delete(todo.id);
        self.loadTodos();
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
        loadTodos,
        removeTodo,
    };
})