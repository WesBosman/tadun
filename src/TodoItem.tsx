import { FC } from "react";
import { observer } from 'mobx-react';
import { ITodoItem } from './models/Todo';

interface TodoProps {
    item: ITodoItem
}

const TodoItem: FC<TodoProps> = ({item}): JSX.Element => {
    const isCompletedClass = item.isCompleted ? 'line-through' : '';
    return (
        <span className={"flex w-full"}>
            <label htmlFor="item" className={`flex justify-between w-4/5 text-slate-700 pl-8 pr-1 gap-2 hover:cursor-pointer`} onClick={() => {
                item.setIsCompleted()
            }}>
                <div className={"flex gap-2"}>
                    <input className="basis-1 checked:bg-blue-500 " type="checkbox" name="item" checked={item.isCompleted} onChange={()=>{}}/>
                    <span className={`text-left hover:text-slate-900 ${isCompletedClass}`}>{item.title}</span>
                </div>
                <span>{item.date}</span>
            </label>
            <span className={"tooltip hover:cursor-pointer hover:text-blue-700 w-1/5 px-2 text-blue-500"} onClick={() => item.setShowActions()}>Actions
                <div className={`${item.showActionClass} tooltip-text flex align-center justify-around gap-2 w-30 bg-gray-100 rounded`}>
                    <div className={"hover:text-red-700 text-red-500 px-2"} onClick={item.delete}>Delete</div>
                </div>
            </span>
        </span>
    );
}

export default observer(TodoItem);