const express = require('express');

const router = express.Router();
const { createPost, getPosts, getPostById, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware(['admin']), createPost);
router.delete('/:id', authMiddleware(['admin']), deletePost);

router.get('/', getPosts);
router.get('/:id', getPostById);

module.exports = router;