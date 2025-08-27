import { Note } from '../types/types';
import { useNavigate } from 'react-router-dom';

function NotesSection(props:{notes:Note[], isLoading:boolean}) {
    const navigate = useNavigate();
    if (props.isLoading) {
        return(<p>Loading....</p>);
    }
    return(
        <div className="notes-containter">
            {props.notes?.map((n:Note) => {
                return(
                    <div key={n.id} className="note">
                        <h1 className="title">{n.title}</h1>
                        <p className="content">{n.content}</p>
                        <div className="edit" 
                            onClick={() => navigate(`/edit-note/${n.id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"/></svg></div>
                        <div className="del-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path  d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg></div>
                    </div>
                );
            })}
        </div>
    );
}
export default NotesSection;