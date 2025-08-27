import Search from '../components/Search';
import { useNotesContext } from '../context/NotesContext';
import { useState } from 'react';
import { Note } from '../types/types';
import NotesSection from "../components/NotesSection";

function Notes() {
    const notesContext = useNotesContext()
    const [searchKey, setSearchKey] = useState<string>('');

    const { isPending, isError, data, error } = notesContext.useGetNotes(searchKey);
    if(isError) {
        console.log(error);
        return(
            <p>error</p>
        );
    }

    return (
    <>
        <Search onKeywordChange={(value) => setSearchKey(value)}/>
        <NotesSection isLoading={isPending} notes={data ? data : []}/>
    </>);
} 
export default Notes;