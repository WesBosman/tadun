import { rootStore } from './models/Root';
import { observer } from 'mobx-react';
import TodoItem from './TodoItem';

const TodoList = () => {
    const date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

    return (
        <div className="flex flex-col items-center shadow-lg bg-slate-50 shadow-md pb-2" style={{
                background: 'linear-gradient(0.25turn, white 24px, rgb(248 113 113) 2px, rgb(248 113 113) 2px, white 26px, white)',
            }}>
            <div className="mt-8 w-full" >
                <div className="w-full pl-8 flex flex-row justify-end pr-2">{date}</div>
                {rootStore.items.map((item: any, i: any) => {
                    return (<TodoItem key={i} item={item}/>);
                })}
            </div>
            <div className="mt-8 w-full">
                <div className="flex text-slate-700 w-full pl-8 gap-2 border-t-2 border-blue-400">&nbsp;</div>
            </div>
        </div>
    )
}

export default observer(TodoList);