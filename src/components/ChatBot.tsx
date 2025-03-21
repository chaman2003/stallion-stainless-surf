import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from './ui/card';
import { IoCloseOutline } from "react-icons/io5";
import { BsChatRightDotsFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import api from '@/services/api';
import { useToast } from './ui/use-toast';

// Define message interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  details?: string[];
  responseType?: string;
}

interface ChatResponse {
  _id?: string;
  id?: string;
  question: string;
  answer: string;
}

interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  sofaType?: string;
  image: string;
}

// Define conversation context interface
interface ConversationContext {
  recentTopics: string[];
  mentionedProducts: string[];
  userPreferences: {
    [key: string]: string | number | boolean;
  };
  lastQueryType?: string;
  officeReferences?: string[];
  locationContext?: string;
  referenceToLastMessage: boolean;
}

// Function to clean any remaining markdown from text
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/```(.*?)```/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/#{1,6} (.*?)(?:\n|$)/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '')
    .trim();
};

// Function to organize response by detecting categories/structure
const organizeResponse = (text: string): { type: string; content: string; details?: string[] } => {
  const lowerText = text.toLowerCase();
  
  // Check if it's a product recommendation
  if (lowerText.includes('recommend') || lowerText.includes('suggest') || lowerText.includes('consider')) {
    const productMatch = text.match(/\b(sofa|chair|table|bed|desk|cabinet|dining|outdoor)\b/i);
    return { 
      type: 'recommendation', 
      content: text.slice(0, 120) + (text.length > 120 ? '...' : ''),
      details: extractKeyPoints(text)
    };
  }
  
  // Check if it's an answer to a question
  if (lowerText.includes('yes') || lowerText.includes('no') || text.includes('?')) {
    return { 
      type: 'answer', 
      content: text.slice(0, 150) + (text.length > 150 ? '...' : ''),
      details: extractKeyPoints(text)
    };
  }
  
  // Check if it's information about shipping/delivery
  if (lowerText.includes('ship') || lowerText.includes('deliver') || lowerText.includes('arrival') || lowerText.includes('time')) {
    return { 
      type: 'shipping', 
      content: text.slice(0, 120) + (text.length > 120 ? '...' : ''),
      details: extractKeyPoints(text)
    };
  }
  
  // Default response type
  return { 
    type: 'general', 
    content: text.slice(0, 150) + (text.length > 150 ? '...' : ''),
    details: extractKeyPoints(text)
  };
};

// Extract key points from a longer text
const extractKeyPoints = (text: string): string[] => {
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  // If text is already short, return as is
  if (sentences.length <= 2) {
    return [text];
  }
  
  // Find most important sentences (usually first and last are important)
  const keyPoints = [];
  
  // First sentence is usually important
  if (sentences.length > 0) {
    keyPoints.push(sentences[0]);
  }
  
  // Find sentences with key indicators of important info
  const importantIndicators = ['important', 'key', 'note', 'remember', 'consider', 'recommend'];
  
  for (let i = 1; i < sentences.length - 1; i++) {
    if (importantIndicators.some(indicator => sentences[i].toLowerCase().includes(indicator)) && 
        keyPoints.length < 3) {
      keyPoints.push(sentences[i]);
    }
  }
  
  // Last sentence often contains conclusion
  if (sentences.length > 1 && keyPoints.length < 3) {
    keyPoints.push(sentences[sentences.length - 1]);
  }
  
  return keyPoints.map(point => point.trim());
};

// Chatbot component
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatResponses, setChatResponses] = useState<ChatResponse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    recentTopics: [],
    mentionedProducts: [],
    userPreferences: {},
    officeReferences: [],
    locationContext: '',
    referenceToLastMessage: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Load chat responses and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get chat responses from API
        const responsesRes = await api.get<ChatResponse[]>('/chat-responses');
        setChatResponses(responsesRes.data);
        
        // Get products from API
        const productsRes = await api.get<Product[]>('/products');
        setProducts(productsRes.data);
      } catch (error) {
        // API service now handles offline mode automatically
        // No need to show error messages here
      }
    };
    
    fetchData();
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      
      // Add welcome message if no messages yet
      if (messages.length === 0) {
        setMessages([
          {
            id: '1',
            text: 'How can I help you with furniture today?',
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }
    }
  }, [isOpen, messages.length]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  // Toggle chat open/closed
  const toggleChat = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
    }
    setIsOpen(!isOpen);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Simulate typing effect
  const simulateTyping = () => {
    return new Promise<void>(resolve => {
      const typingDelay = Math.random() * 1000 + 500; // Random delay between 500-1500ms
      setTimeout(() => {
        resolve();
      }, typingDelay);
    });
  };

  // Function to render message content based on type
  const renderMessageContent = (message: Message) => {
    if (message.sender === 'user') {
      return (
        <div className="message-content text-sm">
          {(message.text || '').split('\n').map((line: string, i: number) => (
            <p key={i} className={i > 0 ? 'mt-1' : ''}>
              {line}
            </p>
          ))}
        </div>
      );
    }
    
    // For bot messages, check for response type
    return (
      <div className="message-content text-sm">
        {/* Main response text */}
        <p>{message.text}</p>
        
        {/* Show key points if available */}
        {message.details && message.details.length > 0 && (
          <div className="mt-2 border-t border-gray-200 pt-2">
            <ul className="list-disc list-inside space-y-1 text-xs">
              {message.details.map((detail: string, idx: number) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Show response type indicator */}
        {message.responseType && (
          <div className="flex items-center mt-1 text-[10px]">
            <span className={`px-1.5 py-0.5 rounded-full ${
              message.responseType === 'recommendation' ? 'bg-green-100 text-green-700' :
              message.responseType === 'shipping' ? 'bg-blue-100 text-blue-700' :
              message.responseType === 'answer' ? 'bg-purple-100 text-purple-700' :
              message.responseType === 'error' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {message.responseType === 'recommendation' ? 'Suggestion' :
               message.responseType === 'shipping' ? 'Shipping' :
               message.responseType === 'answer' ? 'Answer' :
               message.responseType === 'error' ? 'Error' :
               'Info'}
            </span>
          </div>
        )}
      </div>
    );
  };

  // Update conversation context when messages change
  useEffect(() => {
    if (messages.length > 0) {
      updateConversationContext();
    }
  }, [messages]);

  // Extract main topics from recent messages
  const extractTopics = (messages: Message[]): string[] => {
    const topics: string[] = [];
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'is', 'are', 'was', 'were'];
    
    // Get text from all messages
    const text = messages
      .map(m => m.text.toLowerCase())
      .join(' ');
    
    // Furniture-related keywords to look for
    const furnitureKeywords = [
      'sofa', 'chair', 'table', 'desk', 'bed', 'couch', 'dining', 'coffee table',
      'bookshelf', 'cabinet', 'wardrobe', 'dresser', 'nightstand', 'ottoman',
      'outdoor', 'patio', 'cushion', 'leather', 'fabric', 'wood', 'metal', 'glass'
    ];
    
    // Office-related keywords
    const officeKeywords = [
      'office', 'workspace', 'cubicle', 'workstation', 'conference', 'meeting room',
      'ergonomic', 'corporate', 'professional', 'business', 'commercial',
      'reception', 'lobby', 'executive', 'employee', 'co-working', 'open plan'
    ];
    
    // Find mentioned furniture items
    furnitureKeywords.forEach(keyword => {
      if (text.includes(keyword) && !topics.includes(keyword)) {
        topics.push(keyword);
      }
    });
    
    // Find mentioned office-related terms
    officeKeywords.forEach(keyword => {
      if (text.includes(keyword) && !topics.includes(keyword)) {
        topics.push(keyword);
      }
    });
    
    // Look for topics related to shipping, delivery, etc.
    if (text.includes('ship') || text.includes('deliver')) {
      topics.push('shipping');
    }
    
    if (text.includes('price') || text.includes('cost') || text.includes('discount')) {
      topics.push('pricing');
    }
    
    return topics.slice(0, 3); // Limit to 3 most recent topics
  };
  
  // Extract product mentions from messages
  const extractProductMentions = (messages: Message[]): string[] => {
    const productMentions: string[] = [];
    
    // Combine all message text
    const text = messages
      .map(m => m.text.toLowerCase())
      .join(' ');
    
    // Check for specific product types
    const productTypes = [
      'sofa', 'chair', 'table', 'bed', 'desk', 'couch', 'dining table',
      'coffee table', 'bookshelf', 'cabinet'
    ];
    
    productTypes.forEach(product => {
      if (text.includes(product) && !productMentions.includes(product)) {
        productMentions.push(product);
      }
    });
    
    return productMentions;
  };
  
  // Extract user preferences from the conversation
  const extractUserPreferences = (messages: Message[]): {[key: string]: string | number | boolean} => {
    const preferences: {[key: string]: string | number | boolean} = {...conversationContext.userPreferences};
    
    // Get only user messages
    const userMessages = messages.filter(m => m.sender === 'user');
    
    // Combine all message text
    const text = userMessages
      .map(m => m.text.toLowerCase())
      .join(' ');
    
    // Check for color preferences
    const colors = ['black', 'white', 'brown', 'gray', 'blue', 'red', 'green', 'yellow', 'purple', 'orange'];
    colors.forEach(color => {
      if (text.includes(color)) {
        preferences.preferredColor = color;
      }
    });
    
    // Check for material preferences
    const materials = ['leather', 'fabric', 'wood', 'metal', 'glass', 'plastic'];
    materials.forEach(material => {
      if (text.includes(material)) {
        preferences.preferredMaterial = material;
      }
    });
    
    // Check for price range
    if (text.includes('cheap') || text.includes('affordable') || text.includes('inexpensive')) {
      preferences.priceRange = 'low';
    } else if (text.includes('expensive') || text.includes('premium') || text.includes('high-end')) {
      preferences.priceRange = 'high';
    }
    
    return preferences;
  };
  
  // Extract office references from conversation
  const extractOfficeReferences = (messages: Message[]): string[] => {
    const officeRefs: string[] = [];
    
    // Company/corporate references
    const companyKeywords = [
      'tcs', 'tata', 'infosys', 'wipro', 'google', 'microsoft', 'amazon', 
      'apple', 'facebook', 'corporate', 'enterprise', 'startup',
      'company', 'business', 'firm', 'organization', 'corporation'
    ];
    
    // Office type keywords
    const officeTypeKeywords = [
      'open plan', 'cubicle', 'private office', 'corner office', 'executive', 
      'coworking', 'home office', 'remote', 'hybrid', 'flexible'
    ];
    
    // Extract specific references from all messages
    for (const message of messages) {
      if (message.sender !== 'user') continue;
      
      const text = message.text.toLowerCase();
      
      // Check for company references (like "TCS office")
      for (const company of companyKeywords) {
        // More flexible matching for company references
        if ((text.includes(company) && 
            (text.includes('office') || text.includes('like') || text.includes('similar'))) ||
            text.includes(`${company} style`)) {
          officeRefs.push(`${company} office style`);
          break;
        }
      }
      
      // Check for office type references
      for (const officeType of officeTypeKeywords) {
        if (text.includes(officeType)) {
          officeRefs.push(officeType);
          break;
        }
      }
      
      // Check for "my office" or "our office" references
      if (text.includes('my office') || text.includes('our office')) {
        officeRefs.push('personal office');
      }
      
      // Check for office comparisons ("like X office" or "similar to X")
      const comparisonMatch = text.match(/(?:like|similar to|same as|resembles) ([\w\s]+?)(?:'s)? office/i);
      if (comparisonMatch && comparisonMatch[1]) {
        officeRefs.push(`${comparisonMatch[1].toLowerCase()} office style`);
      }
    }
    
    return [...new Set(officeRefs)]; // Remove duplicates
  };
  
  // Extract location context from messages
  const extractLocationContext = (messages: Message[]): string => {
    let locationContext = '';
    
    // Look through user messages for location indicators
    for (const message of messages) {
      if (message.sender !== 'user') continue;
      
      const text = message.text.toLowerCase();
      
      // Check for direct location mentions
      if (text.includes('at home') || text.includes('home office')) {
        locationContext = 'home office';
      } else if (text.includes('at work') || text.includes('at my workplace') || text.includes('at the office')) {
        locationContext = 'workplace';
      }
      
      // More specific office locations
      if (text.includes('reception') || text.includes('lobby')) {
        locationContext = 'reception/lobby area';
      } else if (text.includes('conference') || text.includes('meeting room')) {
        locationContext = 'conference/meeting room';
      } else if (text.includes('break room') || text.includes('lounge')) {
        locationContext = 'break room/lounge';
      }
    }
    
    return locationContext;
  };
  
  // Check if the current message references the previous message
  const checkForMessageReference = (currentMessage: string, previousMessages: Message[]): boolean => {
    if (previousMessages.length === 0) return false;
    
    const lowerMessage = currentMessage.toLowerCase();
    
    // Common patterns for referring to previous context
    const referencePatterns = [
      'same as', 'like i said', 'as i mentioned', 'for the same', 'for that', 
      'this', 'that', 'those', 'these', 'it', 'above', 'previous', 'before',
      'aforementioned', 'earlier', 'last message', 'for it', 'from before',
      'what i just said', 'what i mentioned', 'what i was talking about',
      'as stated', 'already told you', 'just told you'
    ];
    
    // Check for common reference patterns
    const hasReferencePattern = referencePatterns.some(pattern => lowerMessage.includes(pattern));
    if (hasReferencePattern) return true;
    
    // Check for very short messages which often imply reference to previous context
    if (lowerMessage.split(' ').length <= 3 && previousMessages.length > 0) {
      return true;
    }
    
    // If the message contains only product types without much context, likely referencing previous
    const productOnlyRegex = /^(sofa|chair|table|desk|bed|cabinet)s?\s*(for|with|and|that)?\s*$/i;
    if (productOnlyRegex.test(lowerMessage.trim())) {
      return true;
    }
    
    // Look at last user message to check if current message is related
    const lastUserMessage = [...previousMessages].reverse().find(m => m.sender === 'user');
    if (lastUserMessage) {
      const lastMessageText = lastUserMessage.text.toLowerCase();
      
      // If previous message mentioned a company and current doesn't, but asks for furniture
      if (companyKeywordsInText(lastMessageText) && 
          !companyKeywordsInText(lowerMessage) &&
          (lowerMessage.includes('furniture') || hasFurnitureKeywords(lowerMessage))) {
        return true;
      }
    }
    
    return false;
  };
  
  // Helper to check if text contains company keywords
  const companyKeywordsInText = (text: string): boolean => {
    const companyKeywords = [
      'tcs', 'tata', 'infosys', 'wipro', 'google', 'microsoft', 'amazon', 
      'apple', 'facebook', 'corporate', 'enterprise', 'startup',
      'company', 'business', 'firm', 'organization', 'corporation'
    ];
    
    return companyKeywords.some(keyword => text.includes(keyword));
  };
  
  // Helper to check if text contains furniture keywords
  const hasFurnitureKeywords = (text: string): boolean => {
    const furnitureKeywords = [
      'sofa', 'chair', 'table', 'desk', 'bed', 'couch', 'dining', 'coffee table',
      'bookshelf', 'cabinet', 'wardrobe', 'dresser', 'nightstand', 'ottoman'
    ];
    
    return furnitureKeywords.some(keyword => text.includes(keyword));
  };
  
  // Update the conversation context based on messages
  const updateConversationContext = () => {
    // Only process if we have messages (avoid processing on initial render)
    if (messages.length === 0) return;
    
    // Get last 5 messages for context
    const recentMessages = messages.slice(-5);
    
    // Extract topics from user messages
    const topics = extractTopics(recentMessages);
    
    // Extract product mentions
    const products = extractProductMentions(recentMessages);
    
    // Extract user preferences
    const preferences = extractUserPreferences(recentMessages);
    
    // Extract office references
    const officeRefs = extractOfficeReferences(recentMessages);
    
    // Extract location context
    const location = extractLocationContext(recentMessages);
    
    // Get the type of the last user query
    const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
    const lastQueryType = lastUserMessage ? determineQueryType(lastUserMessage.text) : undefined;
    
    // Check if latest message references previous message
    const refToPreviousMessage = lastUserMessage 
      ? checkForMessageReference(lastUserMessage.text, messages.slice(0, -1))
      : false;
    
    // Update context
    setConversationContext({
      recentTopics: topics,
      mentionedProducts: products,
      userPreferences: preferences,
      lastQueryType,
      officeReferences: officeRefs,
      locationContext: location,
      referenceToLastMessage: refToPreviousMessage
    });
  };

  // Determine the type of query the user is making
  const determineQueryType = (text: string): string => {
    text = text.toLowerCase();
    
    if (text.includes('price') || text.includes('cost') || text.includes('how much')) {
      return 'pricing';
    } else if (text.includes('deliver') || text.includes('shipping') || text.includes('ship')) {
      return 'shipping';
    } else if (text.includes('available') || text.includes('in stock')) {
      return 'availability';
    } else if (text.includes('recommend') || text.includes('suggest') || text.includes('best')) {
      return 'recommendation';
    } else if (text.includes('?')) {
      return 'question';
    } else if (text.includes('hello') || text.includes('hi ') || text.includes('hey')) {
      return 'greeting';
    }
    
    return 'general';
  };

  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Store the current input before clearing it
    const userInputText = inputValue.trim();
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: userInputText,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Build context-aware query by including conversation context
      const contextAwareQuery = buildContextAwareQuery(userInputText);
      
      // Try to get response from Gemini AI with context
      const aiResponse = await api.post<{answer: string}>('/chat', { query: contextAwareQuery });
      
      // Shorter typing simulation
      setTimeout(() => {
        if (aiResponse && aiResponse.data && aiResponse.data.answer) {
          // Get cleaner response
          const responseText = cleanMarkdown(aiResponse.data.answer);
          
          // Organize the response
          const organized = organizeResponse(responseText);
          
          // Create the formatted response
          const formattedResponse = organized.content;
          
          const botMessage = {
            id: (Date.now() + 1).toString(),
            text: formattedResponse,
            sender: 'bot' as const,
            timestamp: new Date(),
            details: organized.details || [],
            responseType: organized.type
          };
          
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        } else {
          throw new Error('No response received');
        }
      }, 500);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message if we couldn't get a response
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Unable to connect. Please try again later.",
        sender: 'bot' as const,
        timestamp: new Date(),
        responseType: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };
  
  // Build a context-aware query that includes conversation history and context
  const buildContextAwareQuery = (userQuery: string): string => {
    // Start with the user's query
    let contextQuery = userQuery;
    
    // Detect if user is referring to previous context
    const isReferential = checkForMessageReference(userQuery, messages);
    
    // If message seems to reference previous content, append the last exchange for clarity
    if (isReferential) {
      const recentUserMessages = messages
        .filter(m => m.sender === 'user')
        .slice(-3); // Get last 3 user messages
      
      if (recentUserMessages.length >= 2) {
        // Get most recent previous user message (not the current one)
        const previousUserMessage = recentUserMessages[recentUserMessages.length - 2];
        
        // For very short, likely referential queries, be explicit about connection
        if (userQuery.split(' ').length <= 3 || hasFurnitureKeywords(userQuery.toLowerCase())) {
          contextQuery = `${contextQuery} (Note: I'm referring to my previous message where I mentioned "${previousUserMessage.text}")`;
        } else {
          contextQuery = `${contextQuery} (Note: This is related to my previous message: "${previousUserMessage.text}")`;
        }
        
        // If there's another earlier message with relevant context, include it too
        if (recentUserMessages.length >= 3) {
          const earlierMessage = recentUserMessages[recentUserMessages.length - 3];
          if (companyKeywordsInText(earlierMessage.text.toLowerCase())) {
            contextQuery += ` and also to when I mentioned "${earlierMessage.text}"`;
          }
        }
      }
    }
    
    // If we have context, add it to help the AI generate better responses
    if (conversationContext.recentTopics.length > 0 || 
        conversationContext.mentionedProducts.length > 0 ||
        Object.keys(conversationContext.userPreferences).length > 0 ||
        (conversationContext.officeReferences && conversationContext.officeReferences.length > 0) ||
        conversationContext.locationContext) {
      
      contextQuery += "\n\nContext from our conversation:";
      
      // Add office context with higher priority if available
      if (conversationContext.officeReferences && conversationContext.officeReferences.length > 0) {
        contextQuery += `\nOffice context (IMPORTANT): ${conversationContext.officeReferences.join(', ')}`;
      }
      
      // Add location context
      if (conversationContext.locationContext) {
        contextQuery += `\nLocation context: ${conversationContext.locationContext}`;
      }
      
      // Add recent topics
      if (conversationContext.recentTopics.length > 0) {
        contextQuery += `\nRecent topics we've discussed: ${conversationContext.recentTopics.join(', ')}`;
      }
      
      // Add products mentioned
      if (conversationContext.mentionedProducts.length > 0) {
        contextQuery += `\nProducts we've talked about: ${conversationContext.mentionedProducts.join(', ')}`;
      }
      
      // Add user preferences
      if (Object.keys(conversationContext.userPreferences).length > 0) {
        contextQuery += '\nYour preferences:';
        for (const [key, value] of Object.entries(conversationContext.userPreferences)) {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
          contextQuery += ` ${formattedKey}: ${value},`;
        }
        // Remove trailing comma
        contextQuery = contextQuery.slice(0, -1);
      }
      
      // Add hint based on last query type
      if (conversationContext.lastQueryType) {
        contextQuery += `\nYour last question was about ${conversationContext.lastQueryType}.`;
      }
      
      // If user is referencing previous messages, explicitly include them
      if (conversationContext.referenceToLastMessage) {
        contextQuery += "\n\nIMPORTANT: The user is referring to previous messages. Consider their full context.";
      }
      
      // Get last 3 exchanges for immediate context
      const recentExchanges = messages.slice(-6); // Last 3 exchanges (3 user + 3 bot)
      if (recentExchanges.length > 0) {
        contextQuery += "\n\nRecent messages (most important for context):";
        recentExchanges.forEach(msg => {
          const role = msg.sender === 'user' ? 'You' : 'Assistant';
          // Truncate messages if too long
          const messageText = msg.text.length > 100 ? 
            msg.text.substring(0, 100) + '...' : 
            msg.text;
          contextQuery += `\n${role}: ${messageText}`;
        });
      }
    }
    
    return contextQuery;
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm' : 'fixed bottom-4 right-4 z-50'}`}>
      {/* Chat toggle button with text and icon combined - only show when not fullscreen */}
      {!isFullscreen && (
        <div className="flex flex-col items-end gap-2">
          <Button
            onClick={toggleChat}
            className={`rounded-full shadow-xl hover:shadow-lg transition-all duration-300 bg-blue-700 hover:bg-blue-800 ${isOpen ? 'h-12 w-12' : 'h-12 px-4'}`}
            aria-label={isOpen ? 'Close chat' : 'Chat with us'}
          >
            {isOpen ? (
              <IoCloseOutline size={24} />
            ) : (
              <div className="flex items-center gap-2">
                <BsChatRightDotsFill size={20} />
                <span className="font-medium text-sm">Chat with us</span>
              </div>
            )}
          </Button>
        </div>
      )}
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isFullscreen ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={isFullscreen ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isFullscreen ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`${isFullscreen ? 'w-full max-w-4xl h-[90vh]' : 'absolute bottom-16 right-0 w-80 sm:w-96'}`}
          >
            <Card className={`flex flex-col ${isFullscreen ? 'h-full' : 'h-[500px]'} shadow-2xl overflow-hidden border-0 rounded-xl bg-white`}>
              {/* Chat header */}
              <div className="p-4 border-b bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RiRobot2Line size={22} />
                    <span className="text-lg font-semibold">Furniture Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={toggleFullscreen}
                      variant="ghost" 
                      className="text-white hover:bg-blue-600 transition-colors flex items-center gap-1 px-3 py-1 rounded-md"
                    >
                      {isFullscreen ? (
                        <>
                          <MdOutlineFullscreenExit size={18} />
                          <span className="text-sm font-medium">Collapse</span>
                        </>
                      ) : (
                        <>
                          <MdOutlineFullscreen size={18} />
                          <span className="text-sm font-medium">Expand</span>
                        </>
                      )}
                    </Button>
                    {isFullscreen && (
                      <Button 
                        onClick={toggleChat}
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-blue-600 transition-colors rounded-md"
                      >
                        <IoCloseOutline size={24} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div 
                ref={chatContainerRef} 
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              >
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[90%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`mt-1 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-blue-700 text-white'
                      }`}>
                        {message.sender === 'user' ? (
                          <FaRegUser size={16} />
                        ) : (
                          <RiRobot2Line size={18} />
                        )}
                      </div>
                      
                      {/* Message bubble */}
                      <div 
                        className={`py-2 px-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-blue-700 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 rounded-tl-none shadow-md'
                        }`}
                      >
                        {renderMessageContent(message)}
                        <div
                          className={`text-[10px] mt-1 ${
                            message.sender === 'user' ? 'text-gray-200' : 'text-gray-400'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2">
                      <div className="mt-1 h-8 w-8 rounded-full flex items-center justify-center bg-blue-700 text-white">
                        <RiRobot2Line size={18} />
                      </div>
                      <div className="py-3 px-4 rounded-2xl rounded-tl-none bg-white shadow-md">
                        <div className="flex items-center space-x-1 h-4">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-white flex gap-2 items-center">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="rounded-full bg-blue-700 hover:bg-blue-800 transition-colors h-10 w-10 flex items-center justify-center"
                  disabled={!inputValue.trim()}
                >
                  <IoSend />
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 