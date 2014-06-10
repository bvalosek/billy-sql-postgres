module.exports = PostgresFacade;

var pg        = require('pg');
var sqlParams = require('sql-params');
var Promise   = require('bluebird');
var debug     = require('debug')('billy-sql-postgres');

/**
 * Simple SQL interface facade for postgres. Reduces interaction with the
 * database simply to providing a connection url and calling query.
 * @param {string} url connection string
 * @constructor
 */
function PostgresFacade(url)
{
  if (!url)
    throw new TypeError('url');

  this._url = url;
}

/**
 * Execute a query
 * @param {string} sql
 * @param {object} args
 * @return {Promise} An array of rows
 */
PostgresFacade.prototype.query = function(sql, params)
{
  params = params || [];

  // Translate the args
  var opts = sqlParams(sql, params);

  debug('query: %s', opts.text);
  debug('params: %s', opts.values.join(','));

  // Attempt to get a client from the pool and execute the query
  var _this = this;
  return new Promise(function(resolve, reject) {

    pg.connect(_this._url, function(err, client, done) {
      if (err) return reject(err);
      client.query(opts, function(err, result) {
        done();
        _this._logPool();
        if (err) return reject (err);
        resolve(result.rows);
      });
    });

  });
};

/**
 * debug out info about the pool after every query
 * @private
 */
PostgresFacade.prototype._logPool = function()
{
  var connection = this._connection;

  if (typeof connection !== 'string') return;

  // log info about connection pool
  var pool = pg.pools.getOrCreate(connection);
  var size = pool.getPoolSize();
  var available = pool.availableObjectsCount();
  debug('pool: %d / %d', size - available, size);
};

