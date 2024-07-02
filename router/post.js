const express = require('express');
const router = express.Router();
const postController = require('../controller/post');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/', verifyToken, postController.create);
router.get('/', verifyToken, postController.getAll);
router.get('/:id', verifyToken, postController.getById);
router.put('/:id', verifyToken, postController.update);
router.delete('/:id', verifyToken, postController.deletepost);

module.exports = router;