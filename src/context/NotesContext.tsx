import { ReactNode, createContext, useContext } from "react";
import { Note, NotesContext, NotesResult, NoteResult, WriteResponse } from "../types/types";
import { notesEndPoint, searchEndPoint } from '../utilities/Config'
import axios from 'axios'
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


const notesContext = createContext<NotesContext>({
    useGetNotes: (keyword:string):NotesResult => {
        return {
            data: [],
            isPending: true,
            isError: false,
            error: null
        }
    },
    useGetNote: (id:number) => {
        return {
            data: undefined,
            isPending: true,
            isError: false,
            error: null
        }
    },
    useWriteNote: (): WriteResponse => {
        throw new Error("writeNote is not available. Make sure you're inside NotesProvider.");
    }
});

async function fetchNote(id:number): Promise<Note> {
    const response = await axios.get(`${notesEndPoint}/${id}` );
    if (response.status !== 200) {
        throw new Error(`Failed to fetch rooms`);
    }
    return response.data as Note;
}
async function searchNotes(searchKey:string): Promise<Note[]> {
    const endPoint = searchEndPoint + searchKey;
    const response = await axios.get(endPoint);
    if (response.status !== 200) {
        throw new Error(`Failed to fetch rooms`);
    }
    return response.data as Note[];
}

const saveNote = async (note: Note): Promise<Note> => {
  if (note.id) {
    const response = await axios.put<Note>(`${notesEndPoint}/${note.id}`, note);
    return response.data;
  } else {
    const response = await axios.post<Note>(notesEndPoint, note);
    return response.data;
  }
};

export function NotesProvider({children}:{children:ReactNode}) {
    const useGetNotes = (searchKey:string):NotesResult =>{
        const notesResult = useQuery({
            queryKey: [`notes`, searchKey],
            queryFn: () => searchNotes(searchKey)
        })
        return {
            data: notesResult.data,
            isPending: notesResult.isPending,
            isError: notesResult.isError,
            error: notesResult.error
        }
    }
    const useGetNote = (id:number):NoteResult =>{
        const noteResult = useQuery({
            queryKey: [`note`, id],
            queryFn: () => fetchNote(id)
        })
        return {
            data: noteResult.data,
            isPending: noteResult.isPending,
            isError: noteResult.isError,
            error: noteResult.error
        }
    }
    const useWriteNote = ():WriteResponse => {
        const queryClient = useQueryClient();
        const {error, isError, isPending, isSuccess, data, mutate } = useMutation({ mutationFn: saveNote, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        }})
        return {
            note:data,
            isSuccess:isSuccess,
            isError:isError,
            error:error,
            isPending:isPending,
            writeData:mutate
        };
    }
    return(
        <notesContext.Provider value={{
            useGetNotes: useGetNotes,
            useGetNote : useGetNote ,
            useWriteNote:useWriteNote
        }}>
        {children}
        </notesContext.Provider>
    );
    
}

export function useNotesContext() {
    const context = useContext(notesContext);
    if (!context) {
        throw new Error("useNotesContext must be used within NotesProvider");
    }
    return context;
}
