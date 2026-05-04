import { useState,useEffect} from 'react';
import '../styles/Daily_tasks.css';
import {
  GetDaily_tasks as GetDaily_TasksService,
  CreateDaily_tasks as CreateDaily_TasksService
} from'../services/Daily_tasksservices';

function Daily_tasks() {
  const [showForm, setShowForm] = useState(false);
  const [fecha, setFecha] = useState("");
  const [tasks, setTasks] = useState([{ id: 1, value: "" }]);
  const [nextId, setNextId] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dailyTasks, setDailyTasks] = useState([]);


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

  const handleOpenForm = () => {
    setFecha("");
    setTasks([{ id: 1, value: "" }]);
    setNextId(2);
    setShowForm(true);
  };

  const loadDailyTasks = async () => {
    setLoading(true);
    try {
      const data = await GetDaily_TasksService();
      setDailyTasks(data);
    } catch (error) {
      console.error('Error al cargar las tareas diarias:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const tareasLimpias = tasks.map(t => t.value.trim()).filter(v => v !== "");
    try{
      await CreateDaily_TasksService({ fecha, tasks: tareasLimpias });
      setShowForm(false);
      loadDailyTasks();
    } catch (error) {
      alert(error.response?.data?.error || error.message || "Error guardando programación");
    } finally {
      setSubmitting(false);
    }

  };

  useEffect(() => {
    loadDailyTasks();
  }, []);

  return (
    <div className="daily_tasks_area">
      <div className="title_section">
        <section className="title">
          Tareas <span>diarias</span>
        </section>
        <section>
          <button
            className="add_task"
            onClick={showForm ? () => setShowForm(false) : handleOpenForm}
          >
            {showForm ? "✕ Cancelar" : "＋"}
          </button>
        </section>
      </div>
      <div className="task_section">
        <h2>Tareas programadas</h2>
        {showForm ? (
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
                onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>

            
            <div className="td-form-body">
              
              <div className="td-field-group">
                <label className="td-label"> Fecha de programación</label>
                <input
                  type="date"
                  className="td-input"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
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
                    />
                    {tasks.length > 1 && (
                      <button
                        className="td-btn-remove"
                        onClick={() => handleRemoveTask(task.id)}
                        title="Eliminar tarea"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              
              <button className="td-btn-add" onClick={handleAddTask}>
                ＋ Agregar otra tarea
              </button>
              
            </div>

            
            <div className="td-form-footer">
              <div className="td-footer-info">
                <strong>{filledCount}</strong> tarea
                {filledCount !== 1 ? "s" : ""} completada
                {filledCount !== 1 ? "s" : ""}
              </div>
              <button
                className="td-btn-save"
                disabled={!fecha || filledCount === 0}
                onClick={handleSubmit}
              >
                💾 Guardar programación
              </button>
            </div>
          </div>
        ) : (
          <div className="td-empty">
            {loading ? (
              <p className="loading">Cargando tareas...</p>
            ) : dailyTasks.length === 0 ? (
              <p>No hay tareas programadas</p>
            ) : (
              <div className="tasks-grid">
                {dailyTasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <div className="task-card-header">
                      <p>Fecha programada: {task.fecha}</p>
                      <p>
                        Tareas a realizar: {
                          (() => {
                            try {
                              return JSON.parse(task.tareas).join(' , ');
                            } catch (error) {
                              return task.tareas;
                            }
                          })()
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Daily_tasks;