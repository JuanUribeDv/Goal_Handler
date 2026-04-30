import { useState, useEffect} from 'react'
import React from 'react'
import '../styles/Journal.css'
import { 
  createJournal as createJournalservice,
  getJournal as getJournalservice
} from '../services/Journalservices'



function Journal() {
  
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [journal, setJournal] = useState("")
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
      setJournal(data.note);
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
      await createJournalservice({ note });
      setNote('')
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error guardando nota')
    } finally {
      setSubmitting(false)
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
      <button className='BtnJournal' onClick={handleSubmit}>
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
            <p>{journal || 'No hay notas guardadas'}</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default Journal