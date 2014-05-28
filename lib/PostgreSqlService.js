module.exports = PostgreSqlService;

var Promise        = require('es6-promise').Promise;
var Application    = require('billy').Application;
var Client         = require('pg').Client;
var PostgresFacade = require('./PostgresFacade.js');

/**
 * Provide the application with a sql dependency.
 * @constructor
 * @param {Application} app
 */
function PostgreSqlService(config, app)
{
  var url = config.get('postgres.url', null);
  if (!url) {
    throw new Error('no postgres credentials provided: set config.postgres.url');
  }

  // Create client eagerly so other services can get a reference to it
  this.client = new Client(url);
  app.register('postgres', this.client).asInstance();

  // Expose common-interface sql as weak
  app.register('sql', new PostgresFacade(this.client))
    .asInstance()
    .asWeak();
}

/**
 * Connect to the db.
 * @return {Promise}
 */
PostgreSqlService.prototype.start = function()
{
  var client = this.client;
  return new Promise(function(resolve, reject) {
    client.connect(function(err) {
      if (err) return reject(err);
      resolve();
      console.log('connected to postgres DB');
    });
  });
};

