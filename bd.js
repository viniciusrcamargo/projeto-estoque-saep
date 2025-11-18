import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
//[pause]
const { Pool } = pkg;
//[pause]
const bd = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//[pause]
export default bd;