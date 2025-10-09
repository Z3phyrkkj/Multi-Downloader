<<<<<<< HEAD
const morgan = require('morgan');
const logger = require('../config/logger');

=======
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
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
const stream = {
  write: (message) => logger.info(message.trim())
};

<<<<<<< HEAD
=======
// Exporta middleware morgan configurado
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
module.exports = morgan('combined', { stream });