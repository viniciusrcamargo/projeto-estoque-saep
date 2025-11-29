import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//rotas
import loginRotas from "./routes/loginRoutes.js";
import produtosRotas from "./routes/produtosRoutes.js";
import painelRotas from "./routes/painelRoutes.js";
import movRotas from "./routes/movRoutes.js";


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutos
}));

function checkAuth(req, res, next) {
  if (req.session.usuario) return next();
  res.redirect('/auth/login');
}

app.get('/', (req, res) => {
  res.render('login', { error: null });
});

app.use('/auth', loginRotas);
app.use('/produtos', checkAuth, produtosRotas);
app.use('/painel', checkAuth, painelRotas);
app.use('/movimentacoes', checkAuth, movRotas);

//[pause]

export default app;
