const authSessionChecker = (req, res, next) => {
    console.log(`Session Checker: ${req.session.id}`);
    if (req.session.recover) {
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
  