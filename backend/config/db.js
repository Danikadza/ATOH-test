const {Driver, getCredentialsFromEnv, getLogger} = require('ydb-sdk');
let env = require('./env')

const logger = getLogger({level: 'debug'});
const endpoint = env.DB_ENDPOINT;
const database = env.DB_DATABASE;
const authService = getCredentialsFromEnv();
const ydbDriver = new Driver({endpoint, database, authService});

async function runDbDriver() {
  if (!await ydbDriver.ready(10000)) {
    logger.fatal(`Driver has not become ready in 10 seconds!`);
    process.exit(1);
  }
}

module.exports = {
  runDbDriver,
  ydbDriver
}
