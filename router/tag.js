const express = require('express');
const router = express.Router();
const tagController = require('../controller/tags');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/', verifyToken, tagController.addTag);
router.get('/', verifyToken, tagController.getAll);

module.exports = router;