/**
 * Multi-Downloader API
 *
 * Arquivo principal de configuração do Express.
 * Fornece rotas para download de mídias de Instagram, TikTok, Twitter e Gartic.
 *
 * Repositório: https://github.com/Z3phyrkkj/Multi-Downloader
 * Autor: Z3phyrkkj
 * Licença: MIT
 */
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const loggerMiddleware = require('./middlewares/logger');
const logger = require('./config/logger');

app.use(cors());
app.use(loggerMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);
app.disable('x-powered-by');

app.use('/', require('./routes/index'));
app.use('/api/ig', require('./routes/instagram'));
app.use('/api/tiktok', require('./routes/tiktok'));
app.use('/api/twitter', require('./routes/twitter'));
app.use('/api/gartic', require('./features/gartic/routes/garticRoutes'));
app.use('/api/health', require('./routes/health'));
app.use(require('./middlewares/errorMiddleware'));

module.exports = app;
