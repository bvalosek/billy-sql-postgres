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

app.start();
```

While the `postgres` dependency is available when the service is instantiated,
it doesn't actaully connect until the application begins to start. Make sure to
wait until the `PostgreSqlService` has started before attempting to run any
queries.

Assuming `MyService` is added after `PostgreSqlService`:

```javascript
function MyService(postgres)
{
  this.postgres = postgres;
}

MyService.prototype.start = function()
{
  this.postgres.query( ... );
};
```


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
