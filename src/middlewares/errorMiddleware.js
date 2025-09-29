/**
 * Middleware global para tratamento de erros
 */

/**
 * Middleware global para tratamento de erros
 */
const logger = require('../config/logger');
const { createErrorResponse } = require('../utils/responseFormatter');

module.exports = (err, req, res, next) => {
  logger.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json(createErrorResponse(err.message || 'Internal server error', status, process.env.NODE_ENV === 'development' ? err.stack : undefined));
};