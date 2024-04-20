var express = require('express');
var router = express.Router();
var clients = require('./clients')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/clients', clients)

module.exports = router;
