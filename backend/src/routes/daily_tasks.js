const express = require('express');
const { pool } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas');
    res.json(result.rows);
  } catch (error) {
    console.error('GET /api/daily_tasks error:', error);
    res.status(500).json({ error: 'Error al obtener las tareas diarias' });
  }
});

router.post('/', async (req, res) => {
  const { fecha, tasks } = req.body;

  try{
    const result = await pool.query(
      'INSERT INTO tareas (fecha, tareas) VALUES ($1, $2) RETURNING *',
      [fecha, JSON.stringify(tasks)]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('POST /api/daily_tasks error:', error);
    res.status(500).json({ error: 'Error al crear la tarea diaria' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('DELETE /api/daily_tasks error:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea diaria' });
  }
});
module.exports = router;