const express = require('express');
const router = express.Router();
const { getChatResponses, handleChat } = require('../controllers/chatController');

// Route to get chat responses
router.get('/chat-responses', getChatResponses);

// Route to handle chat requests 
router.post('/chat', handleChat);

module.exports = router; 