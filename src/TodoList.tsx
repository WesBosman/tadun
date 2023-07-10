import { rootStore } from './models/Root';
import { observer } from 'mobx-react';
import TodoItem from './TodoItem';

const TodoList = () => {
    return (            
        <div className="flex flex-col items-center shadow-lg bg-slate-50 shadow-md pb-2" style={{
                background: 'linear-gradient(0.25turn, white 24px, rgb(248 113 113) 2px, rgb(248 113 113) 2px, white 26px, white)',
            }}>
            <div className="mt-8 w-full" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px 30px, transparent 0 30px, dodgerblue 30px 32px)',
                lineHeight: "32px",
                backgroundPositionY: "30px",
                height: `${((rootStore.items.length + rootStore.carriedItems.length + 1) * 32) + 32}px`,
            }} >
                <div className="w-full pl-8 flex flex-row justify-start font-medium text-blue-400">{rootStore.formattedDate}</div>
                {rootStore.items.map((item: any) => {
                    return (<TodoItem key={item.id} item={item}/>);
                })}
                {rootStore.carriedItems.length > 0 && (
                    <div>
                        <div className="w-full pl-8 flex flex-row justify-start font-medium text-blue-400">Carried</div>
                        {rootStore.carriedItems.map((item: any) => {
                            return (<TodoItem key={item.id} item={item}/>);
                        })}
                    </div>
                )}
            </div>
            <div className="mt-8 w-full"></div>
        </div>
    )
}

export default observer(TodoList);