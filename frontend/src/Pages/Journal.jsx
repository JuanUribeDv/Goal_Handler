import { useState, useEffect} from 'react'
import React from 'react'
import '../styles/Journal.css'
import { 
  createJournal as createJournalservice,
  getJournal as getJournalservice,
  deleteJournal as deleteJournalservice
} from '../services/Journalservices'



function Journal() {
  
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [journals, setJournals] = useState([])
  const [loading, setLoading] = useState(false)
  

  useEffect(()=>{
    loadJournal();
    const savedNote = localStorage.getItem('userNote');
    if (savedNote) setNote(savedNote);
  }, []);

  const loadJournal = async () => {
    setLoading(true);
    try {
      const data = await getJournalservice();
      setJournals(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error cargando nota')
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNote(value);
    localStorage.setItem('userNote', value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitting(true)
    setError(null)

    try {
      const newJournal = await createJournalservice({ note });
      setJournals(prev => [newJournal, ...prev]);
      setNote('')
      localStorage.removeItem('userNote');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error guardando nota')
    } finally {
      setSubmitting(false)
    }
  }
  const clearJournal = () => {
    setNote("");
    localStorage.removeItem('userNote');
  }

  
  const handleDelete = async (id) => {
    try {
      await deleteJournalservice(id);
      setJournals(prev => prev.filter(journal => journal.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error eliminando nota')
    }
  }
  

  return (
    <div className="journal">
 
      
      <div className="hero">
        <blockquote className="heroQuote">
          "La escritura es la única forma de pensar sin interrupciones."
        </blockquote>
        <p className="heroLabel">REFLEXIONES propias</p>
      </div>
 
      
      <div className="content">
 
       
        <div className="editorCard">
          <div className="editorHeader">
            <div>
              <h2 className="editorTitle">Reflexión de hoy</h2>
              <p className="editorDate"></p>
            </div>
            <div className="toolbar">
              <button className="toolBtn" aria-label="Negrita"><strong>B</strong></button>
              <button className="toolBtn" aria-label="Cursiva"><em>I</em></button>
              <button className="toolBtn" aria-label="Enlace">🔗</button>
            </div>
          </div>
 
          <textarea
            className="editorTextarea"
            placeholder="Comienza a escribir tu reflexión aquí..."
            value={note}
            onChange={handleChange}
          />
 
          <div className="editorActions">
            <button className="btnPublish" onClick={handleSubmit}>
              PUBLICAR EN DIARIO
            </button>
            <button className="btnClear" onClick={clearJournal}>
              LIMPIAR
            </button>
          </div>
        </div>
 
        
        <div className="notesCard">
          <div className="notesHeader">
            <h3 className="notesTitle">Notas Guardadas</h3>
            <button className="notesRefresh" aria-label="Actualizar">↻</button>
          </div>
          <div className="notesList">
            {loading ? (
                <p>Cargando nota...</p>
              ) : (
                <div className="journals-grid">
                  {journals.map(journal => (
                    <div key={journal.id} className='journal-card-entry'>
                      <div className='header-date'>
                        <header> Fecha de realización: {new Date(journal.fecha_creacion).toLocaleDateString()}</header>
                      </div>
                      <div className='content-body'>
                        <p>{journal.contenido}</p>
                      </div>
                      <button className='Btndelete' onClick={() => handleDelete(journal.id)}>
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
 
      </div>
    </div>
  );
  
}
export default Journal