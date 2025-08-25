import { useState } from "react";
import  useLocalStorage from "../hooks/useLocalStorage"

type ListItemProps = {
    onEdit: (newVal:string) => void, 
    onDelete: () => void;
    data:string
}
function ListItem(props:ListItemProps){
    const [editing, setEditing] = useState<boolean>(false);
    let [labelData, setLableData] = useState<string>(props.data);

    return(
    <li onDoubleClick={(e) => {setEditing(true)}}>
        {editing?(
            <>
                <div className="edit-group">
                    <div className="input-group">
                        <input required type="text" name="text" className="input"
                            value={labelData}
                            onChange={(e)=> setLableData(e.target.value)}>
                        </input>
                        <label className="user-label">Edit</label>
                    </div>
                    <button onClick={(e) => {
                        if (labelData === '') return;
                        props.onEdit(labelData);
                        setEditing(false);
                    }}>ok</button>
                    <button onClick={(e) => {
                        setLableData(props.data);
                        setEditing(false);
                    }}>cancel</button>
                </div>
            </>
            ):(
                <>
                    <p>{labelData}</p>
                    <div className="del-btn" onClick={() => props.onDelete()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path  d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg></div>
                </>

            )}
    </li>
    );

}
type TodoList = Record<number, string>;
function List() { 
    const [items, setItems] = useLocalStorage<TodoList>('Todo-data',{});
    const [nextKey, setNextKey] = useLocalStorage<number>('Todo-next-key',4);
    const [newTodo, setNewTodo] = useState<string>('');
    return(
        <>
            <ol className="list">
                {(Object.entries(items).length > 0) ? Object.entries(items).map(([id, data]) =>{
                    const itemId = Number(id);
                    return(
                        <ListItem 
                            key={itemId}
                            data={data} 
                            onEdit={ (newVal) => {
                                if(newVal === '') return;
                                console.log('newVal = ', newVal);
                                setItems(prev => ({
                                    ...prev,
                                    [itemId]: newVal
                                }));
                            }}   
                            onDelete={()=>{
                                const filteredList: TodoList = {}
                                for(let key in items){
                                    if(parseInt(key) !== itemId){
                                        filteredList[key] = items[key];
                                        console.log(key);
                                    }
                                }
                                setItems(filteredList);
                            }}
                        />
                    );
                }
                ):(
                    <p>No Items</p>
                )
            }
            </ol>
            <div className="edit-group">
                <div className="input-group">
                    <input 
                        value={newTodo} 
                        type="text" 
                        name="text" 
                        className="input"
                        onChange={(e)=> setNewTodo(e.target.value)}>
                    </input>
                    <label className="user-label">Edit</label>
                </div>
                <button onClick={(e) => {
                    if(newTodo === '') return;
                    setItems(prev => ({
                        ...prev,
                        [nextKey]: newTodo
                    }));
                    setNextKey(nextKey +1);
                    setNewTodo('');
                }}>Add</button>
            </div>
        </>
    );
}
export default List;