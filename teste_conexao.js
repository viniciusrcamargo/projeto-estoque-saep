import dotenv from 'dotenv';
dotenv.config();
import pool from './bd.js';

async function testar() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Conexão bem-sucedida:', res.rows[0]);
    } catch (err) {
        console.error('Erro na conexão:', err);
    }
}

testar();