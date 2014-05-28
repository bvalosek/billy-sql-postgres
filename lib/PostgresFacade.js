module.exports = PostgresFacade;

var Client  = require('pg').Client;
var Promise = require('es6-promise').Promise;
var debug   = require('debug')('billy:PostgresFacade');

/**
 * Simple SQL interface facade for postgres
 * @param {Client} client
 * @constructor
 */
function PostgresFacade(client)
{
  this._client = client;
}

/**
 * Execute a query
 * @param {string} sql
 * @param {array.<any>} fields
 * @return {Promise} An array of rows
 */
PostgresFacade.prototype.query = function(sql, fields)
{
  debug('query: %s', sql);
  var client = this._client;
  return new Promise(function(resolve, reject) {
    client.query(sql, fields || [], function(err, result) {
      if (err) return reject(err);
      resolve(result.rows);
    });
  });
};
