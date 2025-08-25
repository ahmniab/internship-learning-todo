export type ListItemProps = {
    onEdit: (newVal:string) => void, 
    onDelete: () => void;
    data:string
}
export type TodoList = Record<number, string>;
