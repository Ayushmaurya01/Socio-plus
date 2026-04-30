const express = require('express');
const router = express.Router();
const { createPost, getFeedPosts, likePost, commentPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPost);
router.get('/feed', protect, getFeedPosts);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
