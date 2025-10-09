<<<<<<< HEAD
=======
/**
 * Middleware global para tratamento de erros
 */

/**
 * Middleware global para tratamento de erros
 */
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
const logger = require('../config/logger');
const { createErrorResponse } = require('../utils/responseFormatter');

module.exports = (err, req, res, next) => {
  logger.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json(createErrorResponse(err.message || 'Internal server error', status, process.env.NODE_ENV === 'development' ? err.stack : undefined));
};