const bcrypt = require('bcrypt');
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function criarUsuario(email, senha) {
  // const saltRounds = 10;
  // const hash = await bcrypt.hash(senha, saltRounds);
  await pool.query('INSERT INTO usuarios (email, senha) VALUES ($1, $2)', [email, senha]);
  console.log('Usuário criado com sucesso!');
}

criarUsuario('vinicius@gmail.com', '123123');