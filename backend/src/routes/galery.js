const express = require('express');
const { pool } = require('../db');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM metas WHERE completada = true ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('GET /api/galery error:', error);
    res.status(500).json({ error: 'Error al obtener las metas completadas' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'update metas set completada = false where id = $1 returning *',
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('DELETE /api/galery/:id error:', error);
    res.status(500).json({ error: 'Error al eliminar la meta' });

  }
});
module.exports = router;