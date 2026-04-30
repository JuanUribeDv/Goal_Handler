const express = require('express');
const { pool } = require('../db');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, titulo, descripcion, fecha_inicio, fecha_limite, completada FROM metas ORDER BY id'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('GET /api/goals error:', error);
    res.status(500).json({ error: 'Error al obtener las metas' });
  }
});

// POST: Crear una nueva meta (sin cambios)
router.post('/', async (req, res) => {
  const { titulo, descripcion, fecha_inicio, fecha_limite } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO metas (titulo, descripcion, fecha_inicio, fecha_limite) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, descripcion || null, fecha_inicio || null, fecha_limite || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('POST /api/metas error:', error);
    res.status(500).json({ error: 'Error al crear la meta' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Objeto con campos a actualizar (ej.: { titulo: 'nuevo', completada: true })

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
  }

  try {
    // Construir la query dinámicamente
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const query = `UPDATE metas SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;

    values.push(id); // Agregar el id al final de los valores

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Meta no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('PUT /api/metas/:id error:', error);
    res.status(500).json({ error: 'Error al actualizar la meta' });
  }
});

// DELETE: Eliminar una meta (sin cambios)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM metas WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Meta no encontrada' });
    }

    res.json({ message: 'Meta eliminada', meta: result.rows[0] });
  } catch (error) {
    console.error('DELETE /api/metas/:id error:', error);
    res.status(500).json({ error: 'Error al eliminar la meta' });
  }
});

module.exports = router;
