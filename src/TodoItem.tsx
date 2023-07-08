import { FC } from "react";
import { observer } from 'mobx-react';
import { ITodoItem } from './models/Todo';

interface TodoProps {
    item: ITodoItem
}

const TodoItem: FC<TodoProps> = ({item}): JSX.Element => {
    const isCompletedClass = item.isCompleted ? 'line-through' : '';
    return (
        <label htmlFor="item" className={`flex justify-between text-slate-700 w-full pl-8 pr-1 gap-2 hover:cursor-pointer`} onClick={(e) => {
            item.setIsCompleted()
        }}>
            <div className={"flex gap-2"}>
                <input className="basis-1 checked:bg-blue-500 " type="checkbox" name="item" checked={item.isCompleted} onChange={()=>{}}/>
                <span className={`text-left hover:text-slate-900 ${isCompletedClass}`}>{item.title}</span>
            </div>
            <span className="">{item.date}</span>
        </label>
    );
}

export default observer(TodoItem);