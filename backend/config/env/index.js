require('dotenv').config()
const { env } = process

module.exports = {
  ALCHEMY_API: env.ALCHEMY_API,
  DB_ENDPOINT: env.DB_ENDPOINT,
  DB_DATABASE: env.DB_DATABASE,
}
