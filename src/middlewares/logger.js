/**
 * Logger middleware: integra morgan (HTTP request logging)
 * com winston (logger configurado em src/config/logger.js)
 */

/**
 * Middleware de logging HTTP integrado ao Winston
 */
const morgan = require('morgan');
const logger = require('../config/logger');

// Stream para morgan redirecionar logs ao winston
const stream = {
  write: (message) => logger.info(message.trim())
};

// Exporta middleware morgan configurado
module.exports = morgan('combined', { stream });