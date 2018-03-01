const logger = require('oh-my-log');
const log = logger('client', {
  prefix: '%s:yellow',
  locals: {
    'connect': '⚪',
    'disconnect': '⚫️️',
    'error': '✖️',
    'data': '✔',
    'start': '▶️',
    'stop': '❌'
  }
});

module.exports = log;

