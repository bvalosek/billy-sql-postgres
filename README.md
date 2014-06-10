# billy-sql-postgres

[![Build Status](https://travis-ci.org/bvalosek/billy-sql-postgres.png?branch=master)](https://travis-ci.org/bvalosek/billy-sql-postgres)
[![NPM version](https://badge.fury.io/js/billy-sql-postgres.png)](http://badge.fury.io/js/billy-sql-postgres)

A [Billy](https://github.com/bvalosek/billy) service that allows for executing
queries against a PostgreSQL database.

## Install

```
$ npm install billy-sql-postgres
```

## Usage

```javascript
var Application = require('billy');
var SqlService  = require('billy-sql-postgres');

var app = new Application();

app.service(SqlService);
app.config('postgres.url', 'posgres://user:pw@127.0.0.1:5432');
```

Use the `sql` dependency in any service or other injected objects:


```javascript
app.service(function(sql) {
  sql.query('select * from widgets').then(function(rows) {
    ...
  });
});
```

Queries are all queued and executed via connections from the internal
connection pool on the `pg` global object.


## Injectables

New dependencies that you can use after adding this service:

 tag | type |description | notes
-----|------|------------|-------
`sql` | `PostgresFacade` | The generic SQL interface | Promise-based `query` interface

## Configs

Available config properties:

 config | type | description | default value | notes
--------|------|-------------|---------------|------
`postgres.url` | `string` | The connection string | `null` | The service will error out if not provided

## Testing

```
$ npm test
```

## License

MIT
