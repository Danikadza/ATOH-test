const express = require('express');
const { authSessionChecker } = require("../../middlewares/auth");
const { getAllUserClients, changeStatus } = require("./controllers");

const router = express.Router();

router.get('/', authSessionChecker, getAllUserClients);
router.post('/', authSessionChecker, changeStatus);

module.exports = router;
