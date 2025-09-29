/**
 * Multi-Downloader - App Principal
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
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

app.use((error, req, res, next) => {
  logger.error('Global error handler:', error);
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        code: 500
      }
    });
  }
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
