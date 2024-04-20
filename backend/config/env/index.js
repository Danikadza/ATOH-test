require('dotenv').config()
const { env } = process

module.exports = {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  ALCHEMY_API: env.ALCHEMY_API,
  AUTH_MESSAGE: env.AUTH_MESSAGE,
  COOKIE_SECRET: env.COOKIE_SECRET,
  DB_ENDPOINT: env.DB_ENDPOINT,
  DB_DATABASE: env.DB_DATABASE,
  ADMIN_UI_PATH: env.ADMIN_UI_PATH,
}
