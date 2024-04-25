var express = require('express');
var router = express.Router();
var clients = require('./clients')
var auth = require('./auth')


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/clients', clients)
router.use('/auth', auth)

module.exports = router;
