const {ydbDriver} = require("../config/db");
const ysbSessionMiddleware = async (req, res, next) => {
  await ydbDriver.tableClient.withSession( (session) => {
    console.log('Ydb session connected')
    req.ydbSession = session
  });

  next()
}


module.exports = {
  ysbSessionMiddleware
}
