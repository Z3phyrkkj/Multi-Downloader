/**
 * Multi-Downloader - Server
 * Autor: Z3phyrkkj
 * Data: 2025-09-29
 */
const app = require('./app');
const logger = require('./config/logger');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Servidor: http://localhost:${PORT}`);
});

module.exports = server;
