var test              = require('tape');
var mock              = require('nodemock');
var PostgreSqlService = require('../lib/PostgreSqlService.js');

test('service', function(t) {
  t.plan(2);

  var config = mock.mock();
  var app = mock.mock();

  // Check url with def null
  config.mock('get')
    .takes('postgres.url', null)
    .returns('postgres://u:p@local/local');

  // Ssetup sql and postgres deps
  app.mock('register')
    .takesF(function(tag, thing) { return tag === 'sql'; })
    .returns(
      mock.mock('asInstance').takesAll()
        .returns(mock.mock('asWeak').takesAll())
    );

  var postgres = new PostgreSqlService(app, config);

  t.ok(config.assert());
  t.ok(app.assert());
});

test('throws on bad url', function(t) {
  t.plan(1);

  var config = mock.mock();
  config.mock('get').takesAll().returns(null);

  t.throws(function() { new PostgreSqlService(config); }, Error);
});
