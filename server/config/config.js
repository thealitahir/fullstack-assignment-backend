require('dotenv').config();
console.log(process.env.DATABSE_USERNAME,process.env.DATABASE_PASSWORD)
module.exports = {
  "development": {
    "username": "postgres",
    "password": "coolermaster",
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port":5432,
    "secret":process.env.NODE_ENV,
    "logging": true
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
