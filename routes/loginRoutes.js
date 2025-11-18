import express from 'express';
import bd from '../bd.js'; // conexão com PostgreSQL (Pool)

const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login', { error: null });
});


router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const result = await bd.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    const usuario = result.rows[0];

    if (usuario.senha !== senha) {
      return res.status(401).send('Senha incorreta');
    }

    req.session.usuario = usuario;
    res.redirect('/painel');
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).send('Erro interno no servidor');
  }

});


// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

export default router;