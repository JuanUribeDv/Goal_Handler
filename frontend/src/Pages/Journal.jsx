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
    <div className='journalPage'>
      <title>Goal Tracker</title>
      <textarea
        className="notepad"
        placeholder="Empieza a escribir tus ideas aquí..."
        value={note}
        onChange={handleChange}
      />
      <button className='Btnclear' onClick={clearJournal}>
        Limpiar Notas
      </button>
      <button className='Btnsubmit' onClick={handleSubmit}>
        {submitting ? 'Guardando...' : 'Guardar Notas'}
      </button>
      <div className='journal-card'>
        <div className='journal-card-header'>
          <h2>Notas Guardadas:</h2>
        </div>
        <div className='journal-card-body'>
          {loading ? (
            <p>Cargando nota...</p>
          ) : (
            journals.map(journal => (
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}
export default Journal