// controllers/chatController.js
const Chat = require('../models/chatModel');

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: 1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
