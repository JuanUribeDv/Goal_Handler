import { useState, useEffect } from 'react'
import '../styles/Goals.css'

import {
  getGoals as fetchGoals,
  createGoal as createGoalService,
  deleteGoal as deleteGoalService,
} from '../services/Goalservices'
import {UpdateGalery as UpdateGaleryService} from '../services/Galeryservices'

function Goals() {
  
  const [goals, setGoals] = useState([])
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFinal: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const loadGoals = async () => {
    setLoading(true)
    try {
      setError(null)
      const list = await fetchGoals()
      setGoals(list)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error cargando metas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleMark = async (event) => {
    try {
      const updated = await UpdateGaleryService(event, { completada: true });
      setGoals(prev => prev.map(goal => goal.id === event ? updated : goal));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error marcando meta como completada')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.titulo.trim() === '') {
      setError('El título es obligatorio')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const created = await createGoalService({
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha_inicio: formData.fechaInicio || null,
        fecha_limite: formData.fechaFinal || null,
      })

      setGoals(prev => [created, ...prev])
      setFormData({ titulo: '', descripcion: '', fechaInicio: '', fechaFinal: '' })
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error creando meta')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setError(null)
      await deleteGoalService(id)
      setGoals(prev => prev.filter(goal => goal.id !== id))
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error eliminando meta')
    }
  }

  return (
    <div className="page">
      <title>Goal Tracker</title>
      <div className="page-card">
        <h2 className="page-title">Crear nueva meta</h2>

        <form onSubmit={handleSubmit} className="goal-form">
          <div className="form-group">
            <label className="field-label">Título</label>
            <input
              type="text"
              name="titulo"
              required
              className="field-input"
              placeholder="Ej: Aprender TypeScript"
              value={formData.titulo}
              onChange={handleChange}
            /> 
          </div>

          <div className="form-group">
            <label className="field-label">Descripción</label>
            <textarea
              name="descripcion"
              rows="3"
              className="field-textarea"
              placeholder="Describe tu meta..."
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="field-label">Fecha inicio</label>
              <input
                type="date"
                name="fechaInicio"
                required
                className="field-input"
                value={formData.fechaInicio}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="field-label">Fecha límite</label>
              <input
                type="date"
                name="fechaFinal"
                required
                className="field-input"
                value={formData.fechaFinal}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="button button-primary"
          >
            {submitting ? 'Guardando...' : 'Guardar meta'}
          </button>
        </form>

        {error && <p className="form-error">{error}</p>}

        <section className="saved-goals">
          <h3 className="section-title">Metas guardadas</h3>
           
          {loading ? (
            <p className="loading">Cargando metas...</p>
          ) : goals.length === 0 ? (
            <p className="empty">No hay metas aún. </p>
          ) : (
            <div className="goals-grid">
              {goals.map(goal => (
                <div key={goal.id} className="goal-card">
                  <div className="goal-card-header">
                    <div>
                      <p className="goal-title">{goal.titulo}</p>
                      <p className="goal-desc">{goal.descripcion}</p>
                    </div>
                    <button className="btneliminar"onClick={() => handleDelete(goal.id)}>Eliminar</button>
                    <button className="btnver">Ver</button>
                    <button className="btnmarcar" onClick={()=> handleMark(goal.id)}>Marcar como completada</button>
                  </div>

                  <div className="goal-meta">
                    <div>
                      <span className="meta-label">Inicio:</span>{' '}
                      {new Date(goal.fecha_inicio || '-').toLocaleDateString()}
                    </div>
                    <div>
                      <span className="meta-label">Límite:</span>{' '}
                      {new Date(goal.fecha_limite || '-').toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              <div className='buttonsection'>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Goals
