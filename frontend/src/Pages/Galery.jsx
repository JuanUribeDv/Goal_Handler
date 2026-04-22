import {useState, useEffect} from 'react'
import '../styles/Galery.css'
import { GetGalery as getGaleryservice,
         deleteGalery as deleteGaleryService
 } from '../services/Galeryservices'

function Galery(){
    
    const [galery, setGalery] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadGalery = async () => {
        setLoading(true);
        try {
            const galeryData = await getGaleryservice();
            setGalery(galeryData);
        } catch (error) {
            console.error('Error loading galery:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGalery();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteGaleryService(id);
            loadGalery(); 
        } catch (error) {
            console.error('Error deleting galery:', error);
        }
    };

    return(
        <div className='galeryPage'>
            <title>Galería</title>
            <h1>Galería de metas</h1>
            <div className='galery-card'>
                {loading ? (
                    <p className="loading">Cargando galería...</p>
                ) : galery.length === 0 ? (
                    <p className="empty">No hay metas en la galería.</p>
                ) : (
                    <div className="galery-grid">
                        {galery.map((goal) => (
                            <div key={goal.id} className="goal-card">
                                <div className="goal-card-header">
                                <div>
                                    <p className="goal-title">{goal.titulo}</p>
                                    <p className="goal-desc">{goal.descripcion}</p>
                                </div>
                                <button className='btn-delete' onClick={() => handleDelete(goal.id)}>
                                    Delete from galery
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )

}
export default Galery
