const Chat = require('../models/Chat');
const Message = require('../models/Message');

const createChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.user._id, req.body.receiverId] }
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = await Chat.create({
      members: [req.user._id, req.body.receiverId]
    });

    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.user._id] }
    }).populate('members', 'username profilePic');
    
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const { chatId, text, mediaUrl } = req.body;
    
    const message = await Message.create({
      chatId,
      senderId: req.user._id,
      text,
      mediaUrl
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createChat, userChats, addMessage, getMessages };
