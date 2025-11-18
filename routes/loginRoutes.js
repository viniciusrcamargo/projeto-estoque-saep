import express from 'express';
import bd from '../bd.js'; // conexão com PostgreSQL (Pool)

const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login', { error: null });
});


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const result = await bd.query('SELECT * FROM usuarios WHERE email=$1', [email]);
  
  if (result.rowCount === 0) {
    return res.render('login', { error: 'Usuário não encontrado' });
  }
  const usuario = result.rows[0];
  // Comparação simples sem criptografia
  if (senha !== usuario.senha) {
    return res.render('login', { error: 'Senha incorreta' });
  }
  req.session.user = usuario;
  res.redirect('/painel/listar');
});


// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

export default router;