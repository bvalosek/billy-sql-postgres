# billy-sql-postgres

[![Build Status](https://travis-ci.org/bvalosek/billy-sql-postgres.png?branch=master)](https://travis-ci.org/bvalosek/billy-sql-postgres)
[![NPM version](https://badge.fury.io/js/billy-sql-postgres.png)](http://badge.fury.io/js/billy-sql-postgres)

A [Billy](https://github.com/bvalosek/billy) service that connects to a
PostgreSQL database.

## Install

```
$ npm install billy-sql-postgres
```

## Usage

```javascript
var Application       = require('billy').Application;
var PostgreSqlService = require('billy-sql-postgres');

var app = new Application();

app.service(PostgreSqlService);
app.config('postgres.url', 'posgres://user:pw@127.0.0.1:5432');
```

The postgres client is available as `postgres`

```javascript
app.service(function(postgres) {
  postgres.query('select * from widgets', function(err, results) {
    ...
  });
});
```

Or use the generic, promise-based Billy facade:

```javascript
app.service(function(sql) {
  sql.query('select * from widgets').then(function(rows) {
    ...
  });
});
```

Queries will be queued and executed as soon as the client connects.

## Injectables

New dependencies that you can use after adding this service:

 tag | type |description | notes
-----|------|------------|-------
`postgres` | pg.Client | The PostgreSQL client | Doesn't connect until the service is started
`sql` | SqlInterface | The generic SQL interface | Promise-based `query` interface

## Configs

Available config properties:

 config | type | description | default value | notes
--------|------|-------------|---------------|------
`postgres.url` | string | The connection string | null | The service will error out if not provided

## Testing

```
$ npm test
```

## License

MIT
