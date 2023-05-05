import { FC } from "react";
import { observer } from 'mobx-react';
import { ITodoItem } from './models/Todo';

interface TodoProps {
    item: ITodoItem
}

const TodoItem: FC<TodoProps> = ({item}): JSX.Element => {
    const isCompletedClass = item.isCompleted ? 'line-through' : '';
    return (
        <label htmlFor="item" className={`flex text-slate-700 w-full pl-8 pt-1 pb-1 gap-2 hover:cursor-pointer border-t-2 border-blue-400 last:border-b-2 ${isCompletedClass}`} onClick={(e) => {
            item.setIsCompleted()
        }}>
            <input className="basis-1 checked:bg-blue-500" type="checkbox" name="item" checked={item.isCompleted}/>
            <span className="hover:text-slate-900 text-left">{item.title}</span>
        </label>
    );
}

export default observer(TodoItem);