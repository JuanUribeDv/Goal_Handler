import { useState, useEffect } from 'react'
import '../styles/Dashboard.css'
import { getGoals as DashboardGoals } from '../services/Goalservices'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'


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

    return (
        <div className="dashboard">
           
            <header className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <button className="dashboard-bellBtn" aria-label="Notificaciones">🔔</button>
            </header>

            
            <div className="dashboard-morningCard" >
                <div className="dashboard-morningContent">
                    <blockquote className="dashboard-morningQuote">
                        "Muchos quieren una vida extraordinaria, pero pocos están dispuestos a hacer lo que esta vida requiere"
                    </blockquote>
                    <button className="dashboard-morningBtn">
                        ✏ ESCRIBIR EN EL DIARIO
                    </button>
                </div>
            </div>

            
            <div className="dashboard-grid">
               
                <div className="dashboard-card">
                    <Calendar
                        onChange={selectedDate => setSelectedDate(selectedDate)}
                        value={selectedDate}
                        locale="es-ES"
                    />
                    <div className="dashboard-calendarEvent">
                        <span className="dashboard-calendarEventDot" />
                        <div>
                            <p className="dashboard-calendarEventTitle">Próximamente</p>
                            <p className="dashboard-calendarEventTime">Tus eventos aparecerán aquí</p>
                        </div>
                    </div>
                </div>

               
                <div className="dashboard-card">
                    <div className="dashboard-cardHeader">
                        <h3 className="dashboard-cardTitle">Metas Activas</h3>
                    </div>
                    <div className="dashboard-State">
                        {loading ? (
                            <p className="loading">Cargando metas...</p>
                        ) : goals.length === 0 ? (
                            <p className="empty">No hay metas aún.</p>
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

                
                <div className="dashboard-card">
                    <p className="dashboard-effLabel">EFICIENCIA SEMANAL</p>
                    <div className="dashboard-emptyState">
                        <p className="dashboard-emptyIcon">📊</p>
                        <p className="dashboard-emptyText">Próximamente</p>
                        <p className="dashboard-emptySubtext">Tu rendimiento semanal aparecerá aquí</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard
