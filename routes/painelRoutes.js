import express from 'express';

const router = express.Router();


// Painel
router.get('/listar', (req, res) => {
  res.render('painel', { usuario: req.session.user });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao encerrar sessão:', err);
      return res.status(500).send('Erro ao sair');
    }
    res.redirect('/auth/login');
  });
});



export default router;