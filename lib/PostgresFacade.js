module.exports = PostgresFacade;

var Client  = require('pg').Client;
var Promise = require('es6-promise').Promise;

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
  var client = this._client;
  return new Promise(function(resolve, reject) {
    client.query(sql, fields, function(err, result) {
      if (err) return reject(err);
      return result.rows;
    });
  });
};
