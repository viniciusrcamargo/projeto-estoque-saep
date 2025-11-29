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

app.set('trust proxy', 1); // importante em produção na Vercel

app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutos
    httpOnly: true,
    sameSite: 'lax', // ou 'none' se tiver frontend separado
    secure: process.env.NODE_ENV === 'production' // true em produção (https)
  }
}));


function checkAuth(req, res, next) {
  console.log('Sessão no checkAuth:', req.session);
  console.log('Cookie recebido:', req.headers.cookie);
  if (req.session && req.session.usuario) return next();
  return res.redirect('/auth/login');
}

app.get('/', (req, res) => {
  res.render('login', { error: null });
});

app.use('/auth', loginRotas);
app.use('/produtos', produtosRotas);
app.use('/painel', painelRotas);
app.use('/movimentacoes', movRotas);

//[pause]

export default app;
