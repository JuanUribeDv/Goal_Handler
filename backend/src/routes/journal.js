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
      'SELECT * FROM diario ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al leer las entradas del diario:', err);
    res.status(500).json({ error: 'Error al cargar las notas del diario' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM diario WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json({ message: 'Nota eliminada', nota: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar la entrada del diario:', err);
    res.status(500).json({ error: 'Error al eliminar la nota del diario' });
  }
});

module.exports = router;
