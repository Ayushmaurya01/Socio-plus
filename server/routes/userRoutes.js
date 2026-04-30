const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, followUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:username', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/:id/follow', protect, followUser);

module.exports = router;
