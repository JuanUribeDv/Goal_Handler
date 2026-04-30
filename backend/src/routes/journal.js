const express = require('express');
const { pool } = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
    const { note } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO diario (contenido) VALUES ($1) RETURNING *',
            [note]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error al crear la entrada en el diario:', err);
        res.status(500).json({ error: 'Error al crear la entrada en el diario' });
    }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT contenido FROM diario ORDER BY id DESC'
    );
    res.json({ note: result.rows[0]?.contenido || '' });
  } catch (err) {
    console.error('Error al leer la entrada del diario:', err);
    res.status(500).json({ error: 'Error al cargar la nota del diario' });
  }
});

module.exports = router;
