import { useState } from "react";
import  useLocalStorage from "../hooks/useLocalStorage"

type ListItemProps = {
    onEdit: (newVal:string) => void, 
    data:string
}
function ListItem(props:ListItemProps){
    const [editing, setEditing] = useState<boolean>(false);
    let [labelData, setLableData] = useState<string>(props.data);

    return(
    <li onDoubleClick={(e) => {setEditing(true)}}>
        {editing?(
            <>
                <div>
                    <input type="text" 
                    value={labelData}
                    onChange={(e)=> setLableData(e.target.value)}
                    ></input>
                    <button onClick={(e) => {setEditing(false)}}>ok</button>
                </div>
            </>
            ):(
                <p>{labelData}</p>
            )}
    </li>
    );

}
type TodoList = Record<number, string>;
function List() { 
    const [items, setItems] = useLocalStorage<TodoList>('Todo-data',{1:"thing1", 2:"thing2", 3:"thing3"});

    return(
        <>
            <ol>
                {Object.entries(items).map(([id, data]) =>{
                    const itemId = Number(id);
                    return(
                        <ListItem 
                            key={itemId}
                            data={data} 
                            onEdit={
                                (newVal) => {
                                    setItems(prev => ({
                                        ...prev,
                                        [itemId]: newVal
                                    }));
                                }
                            }   
                        />
                    );
                }
                )
            }
            </ol>
        </>
    );
}
export default List;