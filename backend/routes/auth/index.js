const express = require('express');
const { authUser} = require("./controllers");

const router = express.Router();

router.post('/', authUser);

module.exports = router;
