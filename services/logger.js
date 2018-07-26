const winston = require('winston');
const fs = require('fs');
const path = require('path');
const MESSAGE = Symbol.for("message");
const env = process.env.NODE_ENV || "development";
const { createLogger, transports } = winston;
const logDir = path.resolve(__dirname, "../", "logs");

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const jsonFormatter = logEntry => {
  const base = { timestamp: `${new Date().toLocaleTimeString()}` };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

const logger = createLogger({
  transports: [
    new transports.File({
      filename: `${logDir}/access.log`,
      colorize: true,
      level: "info",
      format: winston.format(jsonFormatter)()
    }),
    new transports.File({
      filename: `${logDir}/warning.log`,
      colorize: true,
      level: "warn",
      format: winston.format(jsonFormatter)()
    }),
    new transports.File({
      filename: `${logDir}/error.log`,
      colorize: true,
      level: "error",
      format: winston.format(jsonFormatter)()
    })
  ]
});

module.exports = logger;