const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

// Function to clean response text
const cleanResponseText = (text) => {
    // Remove markdown symbols - more comprehensive pattern matching
    let cleaned = text
        .replace(/\*\*\*(.*?)\*\*\*/g, '$1') // Remove bold italic
        .replace(/\*\*(.*?)\*\*/g, '$1')     // Remove bold
        .replace(/\*(.*?)\*/g, '$1')         // Remove italic
        .replace(/__(.*?)__/g, '$1')         // Remove underline
        .replace(/~~(.*?)~~/g, '$1')         // Remove strikethrough
        .replace(/```[\s\S]*?```/g, '')      // Remove code blocks completely
        .replace(/`([^`]*?)`/g, '$1')        // Remove inline code
        .replace(/#{1,6}\s+(.*?)(?:\n|$)/g, '$1') // Remove headings
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Convert links to just text
        .replace(/!\[(.*?)\]\((.*?)\)/g, '') // Remove images
        .replace(/^\s*[-*+]\s+/gm, '')       // Remove list markers
        .replace(/^\s*\d+\.\s+/gm, '')       // Remove numbered list markers
        .replace(/\n{3,}/g, '\n\n')          // Replace multiple newlines with max two
        .replace(/> (.*?)(?:\n|$)/g, '$1')   // Remove blockquotes
        .replace(/\|.*?\|/g, '')             // Remove tables
        .replace(/\\\\/g, '\\')              // Fix escaped backslashes
        .replace(/\\([^\\])/g, '$1')         // Remove other escape characters
        .trim();
    
    // Further cleanup
    cleaned = cleaned
        .replace(/\s{2,}/g, ' ')            // Replace multiple spaces with single
        .trim();
    
    return cleaned;
};

const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }

        // Generate response from Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean and format the response
        text = cleanResponseText(text);

        res.json({
            success: true,
            data: text
        });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating response',
            error: error.message || 'Unknown error occurred'
        });
    }
};

module.exports = {
    generateResponse
}; 