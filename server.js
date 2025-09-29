/**
 * Servidor principal da aplicação
 * Responsável por inicializar o servidor Express
 * e configurar os middlewares e rotas
 */

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/api/ig', require('./routes/instagram'));
app.use('/api/tiktok', require('./routes/tiktok'));
app.use('/api/twitter', require('./routes/twitter'));

app.use(require('./middlewares/errorMiddleware'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});