const express = require('express');
const router = express.Router();
const { generateResponse } = require('../controllers/geminiController');

// Route to generate response from Gemini
router.post('/generate', generateResponse);

module.exports = router; 