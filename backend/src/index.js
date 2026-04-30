const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { connect } = require('./db');
const goalsRouter = require('./routes/goals');
const journalRouter = require('./routes/journal');
const galeryRouter = require('./routes/galery');
const dailyTasksRouter = require('./routes/daily_tasks');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.use('/api/goals', goalsRouter);
app.use('/api/journal', journalRouter);
app.use('/api/galery', galeryRouter);
app.use('/api/daily_tasks', dailyTasksRouter);



app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando 🚀' });
});


connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});