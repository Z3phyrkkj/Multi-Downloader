
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

const shutdown = (signal, exit = true) => {
  return () => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    server.close((err) => {
      if (err) {
        logger.error('Error during server close', err);
        if (exit) process.exit(1);
      }
      logger.info('Server closed');
      if (exit) process.exit(0);
    });
    setTimeout(() => {
      logger.warn('Forcing shutdown');
      if (exit) process.exit(1);
    }, 10000).unref();
  };
};

process.on('SIGTERM', shutdown('SIGTERM'));
process.on('SIGINT', shutdown('SIGINT'));
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  shutdown('uncaughtException')();
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown('unhandledRejection')();
});

module.exports = { server, shutdown };
