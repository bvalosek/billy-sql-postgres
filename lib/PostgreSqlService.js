module.exports = PostgreSqlService;

var Promise        = require('bluebird');
var Client         = require('pg').Client;
var debug          = require('debug')('PostgreSqlService');
var PostgresFacade = require('./PostgresFacade.js');

/**
 * Provide the application with a sql dependency.
 * @constructor
 */
function PostgreSqlService(app, config)
{
  var url = config.get('postgres.url', null);

  if (!url)
    throw new Error('no postgres credentials: set config.postgres.url');

  debug('using connection string: %s', url);

  // Expose common-interface sql as weak
  app.register('sql', new PostgresFacade(url))
    .asInstance()
    .asWeak();
}

