import { types, Instance, flow, destroy, getParent, getRoot, ISimpleType } from "mobx-state-tree"
import { format, formatDistance, startOfDay, endOfDay, subDays, addDays } from "date-fns"
import { db } from "../db";

export const TodoItem = types.model('TodoItem', {
    id: types.identifierNumber,
    title: types.string,
    createdAt: types.optional(types.Date, new Date()),
    completedAt: types.maybeNull(types.Date),
    showActions: false,
}).views(self => ({
    get isCompleted() {
        return self.completedAt !== null
    },
    get showActionClass() {
        return self.showActions ? 'actions' : ''
    },
    /**
     * If the to-do item has been completed show how long it took to complete
     * Otherwise show the date it was created
     */
    get date() {
        if (self.completedAt !== null) {
            return formatDistance(self.completedAt, self.createdAt)
        }

        return format(self.createdAt, "M/d/yy")
    },
})).actions(self => ({
    delete() {
        getRoot(self).removeTodo(self)
    },
    setShowActions() {
        self.showActions = !self.showActions
    },
    setIsCompleted() {
        if (self.isCompleted) {
            self.completedAt = null
        } else {
            self.completedAt = new Date()
        }
        getRoot(self).updateTodo(self)
    }
}))

export interface ITodoItem extends Instance<typeof TodoItem> {}

export const TodoList = types.model('TodoList', {
    items: types.optional(types.array(TodoItem), []),
    carriedItems: types.optional(types.array(TodoItem), []),
    currentDate: types.optional(types.Date, new Date()),
}).views(self => ({
    get formattedDate() {
        return format(self.currentDate, "EEEE, MMM, dd, yyyy")
    },
    get completed() {
        return self.items.filter(x => x.isCompleted)
    },
    get incompleted() {
        return self.items.filter(x => !x.isCompleted)
    }
})).actions(self => {
    const nextDate = () => {
        self.currentDate = addDays(self.currentDate, 1)
        self.loadTodos()
    }

    const today = () => {
        self.currentDate = new Date()
        self.loadTodos()
    }

    const previousDate = () => {
        self.currentDate = subDays(self.currentDate, 1)
        self.loadTodos()
    }

    const addTodo = async (title: string) => {
        await db.todos.add({title: title, createdAt: new Date(), completedAt: null})
        self.loadTodos()
    }

    const updateTodo = async (todo: ITodoItem) => {
        db.todos.update(todo.id, todo)
        self.loadTodos()
    }

    const removeTodo = (todo: ITodoItem) => {
        db.todos.delete(todo.id)
        self.loadTodos()
    }

    const loadCarriedTodos = flow(function*() {
        try {
            const startDate = startOfDay(self.currentDate)
            self.carriedItems = yield db.todos
                .where('createdAt')
                .belowOrEqual(startDate)
                .and(x => x.completedAt === null)
                .toArray()
        } catch (error) {
            console.error(error)
        }
    })
    
    const loadTodos = flow(function*() {
        try {
            const startDate = startOfDay(self.currentDate)
            const endDate = endOfDay(self.currentDate)
            self.loadCarriedTodos()
            self.items = yield db.todos
                .where('createdAt')
                .between(startDate, endDate)
                .toArray()
        } catch (error) {
            console.error(error)
        }
    });

    return {
        previousDate,
        today,
        nextDate,
        addTodo,
        updateTodo,
        removeTodo,
        loadCarriedTodos,
        loadTodos,
    };
})