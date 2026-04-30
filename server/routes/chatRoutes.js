const express = require('express');
const router = express.Router();
const { createChat, userChats, addMessage, getMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createChat);
router.get('/', protect, userChats);
router.post('/messages', protect, addMessage);
router.get('/:chatId/messages', protect, getMessages);

module.exports = router;
