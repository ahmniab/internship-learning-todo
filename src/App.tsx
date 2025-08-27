import './App.css';
import List from './pages/List';
import { Route, Routes, BrowserRouter as Router } from 'react-router';
import Notes from './pages/Notes';
import { NotesProvider } from './context/NotesContext';
import EditNotes from './pages/EditNote';

function App() {
  return (
    <>
    <NotesProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path='/'     element={<List/>}></Route>
            <Route path='/todo' element={<List/>}></Route>
            <Route path='/notes' element={<Notes/>}></Route>
            <Route path='/edit-note/:noteId' element={<EditNotes/>}></Route>
            <Route path='*' element={<h1>Not Found</h1>}></Route>
          </Routes>
        </Router>
      </div>
    </NotesProvider>
    </>
  );
}

export default App;
