import { useState } from 'react';
import { CreateDaily_tasks as CreateDaily_TasksService } from '../services/Daily_tasksservices';
import '../styles/TaskForm.css';

function TaskForm({ onSaved, onCancel }) {
  const [fecha, setFecha] = useState("");
  const [tasks, setTasks] = useState([{ id: 1, value: "" }]);
  const [nextId, setNextId] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const filledCount = tasks.filter((t) => t.value.trim() !== "").length;

  const handleAddTask = () => {
    setTasks((prev) => [...prev, { id: nextId, value: "" }]);
    setNextId((n) => n + 1);
  };

  const handleRemoveTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleTaskChange = (id, value) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, value } : t)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fecha) {
      setError("La fecha es obligatoria");
      return;
    }
    
    if (filledCount === 0) {
      setError("Debes agregar al menos una tarea");
      return;
    }

    setSubmitting(true);
    setError(null);

    const tareasLimpias = tasks.map(t => t.value.trim()).filter(v => v !== "");
    
    try {
      await CreateDaily_TasksService({ fecha, tasks: tareasLimpias });
      onSaved();
    } catch (error) {
      setError(error.response?.data?.error || error.message || "Error guardando tareas");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="td-form-panel">
      <div className="td-form-header">
        <div className="td-form-header-left">
          <div className="td-form-icon">📋</div>
          <div>
            <div className="td-form-title">Programar tareas del día</div>
            <div className="td-form-subtitle">
              Agrega todas las tareas que realizarás
            </div>
          </div>
        </div>
        <button
          className="td-btn-close"
          onClick={onCancel}
          type="button"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="td-form-body">
          <div className="td-field-group">
            <label className="td-label">Fecha de programación</label>
            <input
              type="date"
              className="td-input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="td-tasks-label">
            <span className="td-tasks-label-text">Tareas a realizar</span>
            <span className="td-tasks-count">{tasks.length}</span>
            <div className="td-divider" />
          </div>

          <div className="td-tasks-list">
            {tasks.map((task, index) => (
              <div className="td-task-row" key={task.id}>
                <span className="td-task-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <input
                  type="text"
                  className="td-input"
                  placeholder={`Describe la tarea #${index + 1}...`}
                  value={task.value}
                  onChange={(e) =>
                    handleTaskChange(task.id, e.target.value)
                  }
                  disabled={submitting}
                />
                {tasks.length > 1 && (
                  <button
                    type="button"
                    className="td-btn-remove"
                    onClick={() => handleRemoveTask(task.id)}
                    title="Eliminar tarea"
                    disabled={submitting}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            type="button"
            className="td-btn-add" 
            onClick={handleAddTask}
            disabled={submitting}
          >
            ＋ Agregar otra tarea
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="td-form-footer">
          <div className="td-footer-info">
            <strong>{filledCount}</strong> tarea
            {filledCount !== 1 ? "s" : ""} completada
            {filledCount !== 1 ? "s" : ""}
          </div>
          <button
            type="submit"
            className="td-btn-save"
            disabled={!fecha || filledCount === 0 || submitting}
          >
            {submitting ? "Guardando..." : "💾 Guardar programación"}
          </button>
        </div>
      </form>
    </div>
  );
} 

export default TaskForm;
