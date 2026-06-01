import { useState } from 'react';
import { createGoal as createGoalService } from '../services/Goalservices';
import '../styles/GoalForm.css';

function GoalForm({ onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFinal: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.titulo.trim() === '') {
      setError('El título es obligatorio');
      return;
    }

    if (!formData.fechaInicio || !formData.fechaFinal) {
      setError('Las fechas son obligatorias');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createGoalService({
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha_inicio: formData.fechaInicio,
        fecha_limite: formData.fechaFinal,
      });

      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error creando meta');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-card goal-form-card">
      <h2 className="goal-form-title">Crear nueva meta</h2>

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
            disabled={submitting}
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
            disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
    </div>
  );
}

export default GoalForm;
