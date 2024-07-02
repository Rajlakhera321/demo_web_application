const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

router.post('/users', userController.createUser);
router.post('/userAuthentication', userController.userAuthentication);

module.exports = router;