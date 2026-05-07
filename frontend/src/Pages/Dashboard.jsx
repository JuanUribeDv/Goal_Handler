import { useState, useEffect } from 'react'
import '../styles/index.css'
import '../styles/Dashboard.css'
import { getGoals as DashboardGoals } from '../services/Goalservices'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../styles/Calendar.css'


function Dashboard() {

    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const loadGoals = async () => {
        setLoading(true)
        try {
        setError(null)
        const list = await DashboardGoals()
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

    return(
        <div className='dashboardPage'>
            <title>Goal Tracker</title>
            <div className='d1'>
                <h1>Dashboard</h1>
            </div>
            <div className='tittle-section'> 
                <p>Bienvenido a tu tracker de metas </p>
                <p>"Muchos quieren una vida extraordinaria, pero pocos están dispuestos a hacer lo que esta vida requiere"</p>
            </div>
            <h3>KPIS</h3>
            <div className='Kpis-section'>
                <div className='Goals-kpi'>
                     <p>Total de metas: {goals.length}</p>
                </div>
                <div className='Tasks-kpi'>
                    <p>Tareas completadas</p>
                </div>
            </div>
            <div className='calendar-section'>
                <h3>Calendario</h3>

                <Calendar 
                    value={selectedDate}
                    onChange={setSelectedDate}
                />
            </div>
            

            <div className='DashboardGoalssection'>
                
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
