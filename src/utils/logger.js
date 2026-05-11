const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
};


const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}]: ${message}`;
};

export const logger = {

  info: (message, data) => {
    console.log(formatMessage(LOG_LEVELS.INFO, message));
    if (data !== undefined) {
      console.log(data);
    }
  },


  warn: (message, data) => {
    console.warn(formatMessage(LOG_LEVELS.WARN, message));
    if (data !== undefined) {
      console.warn(data);
    }
  },

  error: (message, data) => {
    console.error(formatMessage(LOG_LEVELS.ERROR, message));
    if (data !== undefined) {
      console.error(data);
    }
  },


  debug: (message, data) => {
    if (import.meta.env.DEV) {
      console.debug(formatMessage(LOG_LEVELS.DEBUG, message));
      if (data !== undefined) {
        console.debug(data);
      }
    }
  },
};

export default logger;
