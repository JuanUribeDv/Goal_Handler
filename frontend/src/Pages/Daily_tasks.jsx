import '../styles/Daily_tasks.css';
import CRUDmanager from '../components/CRUDmanager';
import TaskForm from '../components/TaskForm';
import {
  GetDaily_tasks as GetDaily_TasksService,
  DeleteDaily_tasks as DeleteDaily_TasksService
} from '../services/Daily_tasksservices';

function Daily_tasks() {
  const renderTaskItem = (tasky, onDelete) => (
    <div key={tasky.id} className="task-card">
      <div className="task-card-header">
        <p>Fecha programada: {new Date(tasky.fecha || '-').toLocaleDateString()}</p>
        <div>
          <p>Tareas a realizar:</p>
          <ul>
            {(() => {
              const parsedTareas = Array.isArray(tasky.tareas)
                ? tasky.tareas
                : JSON.parse(tasky.tareas || "[]");
 
              return (
                <ul>
                  {parsedTareas.map((tarea, index) => (
                    <li key={index}>{tarea}</li>
                  ))}
                </ul>
              );
            })()}
          </ul>
          <button className="td-btn-delete" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <CRUDmanager
      title="Tareas diarias"
      listTitle="Tareas programadas"
      fetchUrl={GetDaily_TasksService}
      deleteService={DeleteDaily_TasksService}
      FormComponent={TaskForm}
      renderItem={renderTaskItem}
      heroContent="Los pequeños pasos producen grandes beneficios."
    />
  );
}

export default Daily_tasks;