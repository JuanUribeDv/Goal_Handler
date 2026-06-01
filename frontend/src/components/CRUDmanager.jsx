import { useState, useEffect } from 'react';
import '../styles/CRUDmanager.css';

function CRUDManager({
  title,          
  fetchUrl,       
  deleteService,  
  updateService,  
  FormComponent,  
  renderItem,     
  listTitle,  
  heroContent  
}) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUrl();
      setItems(data);
    } catch (error) {
      console.error('Error al cargar:', error);
      setError(error.response?.data?.error || error.message || 'Error cargando elementos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await deleteService(id);
      loadItems();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setError(error.response?.data?.error || error.message || 'Error eliminando elemento');
    }
  };

  const handleUpdate = async (id, updates) => {
    if (!updateService) return;
    try {
      setError(null);
      await updateService(id, updates);
      loadItems();
    } catch (error) {
      console.error('Error al actualizar:', error);
      setError(error.response?.data?.error || error.message || 'Error actualizando elemento');
    }
  };

  const handleSaved = () => {
    setShowForm(false);
    loadItems();         
  };

  useEffect(() => {
    loadItems();
  }, []);
 
  return (
    <div className="crud-manager">
        <div className="hero">
            <blockquote className="heroQuote">
                "{heroContent}"
            </blockquote>
        </div>
      <div className="crud-manager__header">
        <section className="crud-manager__title">{title}</section>
        <section className="crud-manager__actions">
          <button
            className="crud-manager__button crud-manager__button--primary"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? '✕ Cancelar' : '＋'}
          </button>
        </section>
      </div>

      <div className="crud-manager__section">
        {listTitle && <h2 className="crud-manager__list-title">{listTitle}</h2>}
        {showForm ? (
          <FormComponent
            onSaved={handleSaved}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <div className="crud-manager__empty">
            {loading ? (
              <p className="crud-manager__loading">Cargando...</p>
            ) : error ? (
              <p className="crud-manager__error">{error}</p>
            ) : items.length === 0 ? (
              <p>No hay elementos</p>
            ) : (
              <div className="crud-manager__grid">
                {items.map((item) =>
                  renderItem(
                    item,
                    () => handleDelete(item.id),
                    (updates) => handleUpdate(item.id, updates)
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CRUDManager;