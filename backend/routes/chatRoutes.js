// routes/chatRoutes.js
const express = require('express');
const { getChatHistory } = require('../controllers/chatController');

const router = express.Router();

// Get chat history
router.get('/history', getChatHistory);

module.exports = router;
