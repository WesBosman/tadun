import './App.css'
import { rootStore } from './models/Root';
import TodoList from './TodoList'

function App() {
  return (
    <div className="flex flex-col gap-4 max-w-lg p-4 m-auto bg-slate-800">
      <h1 className="text-slate-100">Tadun</h1>
      <input className="px-3 py-1 w-full rounded" type="text" placeholder="Add item" onKeyDown={(e) => {
        if (e.target.value === '') {
          return;
        }
        if (e.key === 'Enter') {
          rootStore.addTodo(e.target.value);
          e.target.value = '';
        }
      }}/>
      <div className="w-full">
          <div className="flex justify-between align-center text-slate-700 w-100 pt-2 gap-2">
              <div className={"hover:cursor-pointer hover:text-blue-700 text-blue-400"} onClick={rootStore.previousDate}>Previous</div>
              <div className={"hover:cursor-pointer hover:text-blue-700 text-blue-400"} onClick={rootStore.nextDate}>Next</div>
          </div>
      </div>
      <TodoList/>
    </div>
  )
}

export default App
