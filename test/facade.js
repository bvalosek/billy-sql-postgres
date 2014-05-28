var test           = require('tape');
var mock           = require('nodemock');
var PostgresFacade = require('../lib/PostgresFacade.js');

test('facade', function(t) {
  t.plan(2);

  var SQL    = 'some sql';
  var FIELDS = [1];
  var ROWS   = [123];

  var client = mock.mock();
  client.mock('query').takesF(function(sql, fields, cb) {
    cb(null, ROWS);
    return sql === SQL && fields === FIELDS;
  });

  var facade = new PostgresFacade(client);
  facade.query(SQL, FIELDS).then(function() {
    t.pass('made it');
  });

  t.ok(client.assert());
});

test('facade fail promise', function(t) {
  t.plan(2);

  var client = mock.mock('query').takesF(function(sql, fields, cb) {
    cb('error');
    return true;
  });

  var facade = new PostgresFacade(client);
  facade.query().catch(function() {
    t.pass('err it');
  });

  t.ok(client.assert());

});

