import './App.css'
import { rootStore } from './models/Root';
import { TodoItem } from './models/Todo';
import TodoList from './TodoList'

function App() {
  return (
    <div className="max-w-sm p-4 m-auto bg-slate-800">
      <h1 className="text-slate-100">Tadun</h1>
      <div className="mb-2 p-2 rounded-xl shadow-lg bg-slate-400">
        <input className="px-3 py-1 w-full rounded" type="text" placeholder="Add item" onKeyDown={(e) => {
          if (e.target.value === '') {
            return;
          }
          if (e.key === 'Enter') {
            rootStore.addTodo(TodoItem.create({
              id: 2,
              title: e.target.value,
              isCompleted: false,
            }));
            e.target.value = '';
          }
        }}/>
      </div>
      <TodoList/>
    </div>
  )
}

export default App
