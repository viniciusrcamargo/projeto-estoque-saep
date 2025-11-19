import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando localmente em http://localhost:${port}`);
});