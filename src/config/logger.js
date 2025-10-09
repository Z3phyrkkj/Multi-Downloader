const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, colorize } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    myFormat
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), myFormat)
    })
  ],
  exitOnError: false
});

module.exports = logger;
