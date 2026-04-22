import { useState, useEffect} from 'react'
import React from 'react'
import '../styles/Journal.css'
import { createJournal as createJournalservice } from '../services/Journalservices'



function Journal() {
  
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  

  useEffect(()=>{
    const savedNote = localStorage.getItem('userNote');
    if (savedNote) setNote(savedNote);
  }, []);

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
    </div>
  )
}
export default Journal