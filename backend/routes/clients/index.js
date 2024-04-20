const express = require('express');
const { getAllUserClients, changeStatus} = require("./controllers");

const router = express.Router();

router.get('/:user', getAllUserClients);
router.post('/', changeStatus);

module.exports = router;
