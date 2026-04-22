const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const connect = async () => {
  try {
    await pool.connect()
    console.log('DB: Conectado a Postgres 🎉')
  } catch (error) {
    console.error('DB: Error al conectar:', error.message)
    process.exit(1)
  }
}

module.exports = { connect, pool }
