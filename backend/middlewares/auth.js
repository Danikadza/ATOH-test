const jwt = require('jsonwebtoken')

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

const authSessionChecker = (req, res, next) => {
    const decoded = jwt.verify(req.headers['authorization'],tokenKey)
    if (decoded) {
      console.log(`Found User Session`);
      next();
    } else {
      console.log(`No User Session Found`);
      res.status(403).send('No User Session Found');
    }
  };
  
  module.exports = {
    authSessionChecker
  }
  