import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const bd = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();

app.get('/test-db', async (req, res) => {
  try {
    // Testa conexão e consulta simples
    const result = await bd.query('SELECT NOW() as data_atual');
    res.send(`Conexão OK! Data no banco: ${result.rows[0].data_atual}`);
  } catch (err) {
    console.error('Erro no teste:', err.message);
    res.status(500).send(`Erro: ${err.message}`);
  }
});

app.listen(3000, () => console.log('Teste rodando na porta 3000'));