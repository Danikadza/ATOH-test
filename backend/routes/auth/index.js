const express = require('express');
const { authUser, updateUserToken} = require("./controllers");

const router = express.Router();

router.post('/', authUser);
router.post('/updateToken', updateUserToken);

module.exports = router;
