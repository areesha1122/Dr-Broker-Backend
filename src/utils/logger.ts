// src/utils/logger.ts

import winston, { format } from 'winston';
import path from 'path'; // Import the 'path' module to work with file paths

const logFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const logsDirectory = path.join(__dirname, '../..', 'logs'); // Define the directory for log files

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }), // Log to the console with colorized output
    new winston.transports.File({
      filename: path.join(logsDirectory, 'error.log'),
      level: 'error',
    }), // Log errors to a file
    new winston.transports.File({
      filename: path.join(logsDirectory, 'combined.log'),
    }), // Log all levels to another file
  ],
});

export default logger;

// // src/utils/logger.ts

// import winston, { format } from 'winston';

// const logFormat = format.combine(
//   format.timestamp(),
//   format.printf(({ timestamp, level, message }) => {
//     return `${timestamp} [${level}]: ${message}`;
//   })
// );

// const logger = winston.createLogger({
//   level: 'info',
//   format: logFormat,
//   transports: [
//     new winston.transports.Console({
//       format: format.combine(format.colorize(), format.simple()),
//     }), // Log to the console with colorized output
//     new winston.transports.File({
//       filename: 'error.log',
//       level: 'error',
//     }), // Log errors to a file
//     new winston.transports.File({ filename: 'combined.log' }), // Log all levels to another file
//   ],
// });

// export default logger;
