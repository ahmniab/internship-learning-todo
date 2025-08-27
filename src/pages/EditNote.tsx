import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotesContext } from '../context/NotesContext';
import { WriteResponse } from '../types/types'
import './Edit.css';

function EditNote(){
    const context = useNotesContext();
    const { noteId } = useParams<{noteId:string}>();
    const id = parseInt(noteId as string);
    const [title, setTitle] = useState<string>()
    const [content, setContent] = useState<string>()
    const readNoteResponse = context.useGetNote(id);
    const editNoteResponse = context.useWriteNote();
    const navigate = useNavigate();

    useEffect(()=>{
        if(editNoteResponse.isSuccess) navigate('/notes');
    },[editNoteResponse])

    useEffect(()=>{
        setTitle(readNoteResponse.data?.title);
        setContent(readNoteResponse.data?.content);
    },[readNoteResponse.data])

    if (readNoteResponse.isPending) {
        return(<p>loading.....</p>)
    }
    if(readNoteResponse.isError){
        console.log(readNoteResponse.error)
        return(<p>Network Error</p>);
    }
    return(
        <>
            <h1>Edit Note</h1>
            <div className="note-info">
                <div className="input-group">
                    <input required type="text" name="text" className="input"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}>
                    </input>
                    <label className="user-label">Edit Title</label>
                </div>
                <div className="form-group">
                    <label htmlFor="textarea">Note Content</label>
                    <textarea 
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                    ></textarea>
                </div>
                <button 
                    className="save-btn"
                    onClick={()=>{
                        editNoteResponse.writeData({id:id,title:title!, content:content!});
                    }}
                    >Save</button>

            </div>
        </>
    );

}
export default EditNote;