import '../styles/Goals.css';
import CRUDmanager from '../components/CRUDmanager';
import GoalForm from '../components/GoalForm';
import { getGoals as fetchGoals, deleteGoal as deleteGoalService, updateGoal } from '../services/Goalservices';

function Goals() {
  
  const renderGoalItem = (goal, onDelete, onUpdate) => (
    <div key={goal.id} className={`goal-card ${goal.completada ? 'completed' : ''}`}>
      <div className="goal-card-header">
        <div>
          <p className="goal-title">{goal.titulo}</p>
          <p className="goal-desc">{goal.descripcion}</p>
        </div>
        <button className="btneliminar" onClick={onDelete}>
          Eliminar
        </button>
        <button className="btnver">Ver</button>
        <button
          className="btnmarcar"
          onClick={() => onUpdate && onUpdate({ completada: true })}
          disabled={goal.completada}
        >
          {goal.completada ? 'Completada' : 'Marcar como completada'}
        </button>
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
  );

  return (
    <div className="page">
      <title>Goal Tracker</title>
      <CRUDmanager
        title="Metas"
        fetchUrl={fetchGoals}
        deleteService={deleteGoalService}
        updateService={updateGoal}
        FormComponent={GoalForm}
        renderItem={renderGoalItem}
        listTitle="Metas programadas"
        heroContent="Las metas son los puentes entre tus sueños y la realidad."
      />
    </div>
  );
}

export default Goals;
