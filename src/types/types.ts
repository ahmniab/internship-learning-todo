import {UseMutateFunction} from '@tanstack/react-query'
export type ListItemProps = {
    onEdit: (newVal:string) => void, 
    onDelete: () => void;
    data:string
}
export type TodoList = Record<number, string>;

export type SearchProps = {
    onKeywordChange: (searchKeyword: string) => void;
}

export type Note = {
    id:number,
    title:string,
    content:string
}
export type NotesResult = {
    data: Note[] | undefined;
    isPending: boolean;
    isError: boolean;
    error: Error | null
    
}
export type NoteResult = {
    data: Note | undefined;
    isPending: boolean;
    isError: boolean;
    error: Error | null
    
}
export type NotesContext = {
    useGetNotes: (keyword: string) => NotesResult;
    useGetNote: (id: number) => NoteResult;
    useWriteNote: () => WriteResponse;  
};

export type WriteResponse = {
    note:Note|undefined;
    isPending:boolean;
    isError:boolean;
    error:Error | null;
    isSuccess:boolean;
    writeData: UseMutateFunction<Note, Error, Note, unknown> 
}