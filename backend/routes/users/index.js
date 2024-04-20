const express = require('express');
const {getAllUsers} = require("./controllers/getAllUsers");

const router = express.Router();

router.get('/', getAllUsers);

module.exports = router;
