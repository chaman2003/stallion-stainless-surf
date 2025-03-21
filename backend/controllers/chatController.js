const { generateResponse } = require('./geminiController');

// Get all chat responses (placeholder for actual database implementation)
const getChatResponses = async (req, res) => {
    try {
        // For now, just return an empty array or some sample data
        // In a real application, this would fetch from the database
        const responses = [
            {
                _id: "sample1",
                question: "What furniture do you sell?",
                answer: "We sell a variety of furniture including sofas, chairs, tables, and outdoor furniture."
            },
            {
                _id: "sample2",
                question: "delivery options",
                answer: "We offer free delivery for orders over $500 within 50 miles of our showroom."
            },
            {
                _id: "sample3",
                question: "warranty",
                answer: "All of our furniture comes with a 1-year warranty covering manufacturing defects."
            }
        ];
        
        res.json(responses);
    } catch (error) {
        console.error('Error fetching chat responses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching chat responses',
            error: error.message
        });
    }
};

// Handle chat requests by forwarding to Gemini
const handleChat = async (req, res) => {
    try {
        const { query, message } = req.body;
        
        if (!query && !message) {
            return res.status(400).json({
                success: false,
                message: 'Query or message is required'
            });
        }
        
        // Create a copy of the request with the prompt field
        const geminiRequest = {
            body: {
                prompt: query || message
            }
        };
        
        // Create a response handler that we can control
        const geminiResponse = {
            json: (data) => {
                // Ensure the response follows the exact format expected by the frontend
                if (data && data.success && data.data) {
                    // The frontend expects { answer: string }
                    return res.json({ answer: data.data });
                } else {
                    // Fallback response if structure is incorrect
                    return res.json({ 
                        answer: "I'm having trouble processing your request right now. Please try again later."
                    });
                }
            },
            status: (code) => {
                res.status(code);
                return geminiResponse;
            }
        };
        
        // Call Gemini API through our controller
        return generateResponse(geminiRequest, geminiResponse);
    } catch (error) {
        console.error('Chat error:', error);
        res.json({ 
            answer: "I'm sorry, I encountered an error while processing your request. Please try again." 
        });
    }
};

module.exports = {
    getChatResponses,
    handleChat
}; 