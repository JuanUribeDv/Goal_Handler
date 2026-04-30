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

module.exports = router;