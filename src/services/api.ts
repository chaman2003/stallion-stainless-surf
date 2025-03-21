import axios from 'axios';

// Define types to replace 'any'
interface BaseItem {
  _id?: string;
  id?: string;
}

interface Product extends BaseItem {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  sofaType?: string;
  image: string;
  dimensions?: string;
  material?: string;
  color?: string;
}

interface ChatResponse extends BaseItem {
  question: string;
  answer: string;
}

// Flag to track if we're in offline mode
let isOfflineMode = false;

// Check if the API server is available
// This prevents connection errors from showing in the console
async function checkServerAvailability() {
  if (isOfflineMode) return false;
  
  try {
    // Use a HEAD request to minimize bandwidth
    await fetch('http://localhost:3002/api/health', {
      method: 'HEAD',
      signal: AbortSignal.timeout(1000), // Abort after 1 second
    });
    return true;
  } catch (error) {
    if (!isOfflineMode) {
      console.info('Using offline mode with localStorage (API server not available)');
      isOfflineMode = true;
    }
    return false;
  }
}

// Initialize by checking server availability
checkServerAvailability();

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced API methods that check server availability first
const enhancedApi = {
  async get<T>(url: string, config = {}) {
    await checkServerAvailability();
    if (isOfflineMode) {
      return simulateOfflineResponse({ url, method: 'get' }) as Promise<{ data: T }>;
    }
    return api.get<T>(url, config);
  },
  
  async post<T>(url: string, data = {}, config = {}) {
    await checkServerAvailability();
    if (isOfflineMode) {
      return simulateOfflineResponse({ 
        url, 
        method: 'post',
        data: JSON.stringify(data)
      }) as Promise<{ data: T }>;
    }
    return api.post<T>(url, data, config);
  },
  
  async put<T>(url: string, data = {}, config = {}) {
    await checkServerAvailability();
    if (isOfflineMode) {
      return simulateOfflineResponse({ 
        url, 
        method: 'put',
        data: JSON.stringify(data)
      }) as Promise<{ data: T }>;
    }
    return api.put<T>(url, data, config);
  },
  
  async delete<T>(url: string, config = {}) {
    await checkServerAvailability();
    if (isOfflineMode) {
      return simulateOfflineResponse({ 
        url, 
        method: 'delete'
      }) as Promise<{ data: T }>;
    }
    return api.delete<T>(url, config);
  }
};

// Add request interceptor to set auth token
api.interceptors.request.use(
  (config) => {
    // Check if token exists
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    
    // Set token based on availability (admin takes priority)
    if (adminToken) {
      config.headers['Authorization'] = `Bearer ${adminToken}`;
    } else if (userToken) {
      config.headers['Authorization'] = `Bearer ${userToken}`;
    }
    
    // Skip actual API call if we're in offline mode
    if (isOfflineMode) {
      return Promise.reject({ offlineMode: true });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add fallback for when API server is not available
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle offline mode error rejection from request interceptor
    if (error.offlineMode) {
      return simulateOfflineResponse(error.config);
    }
    
    // Handle network errors (server not reachable)
    if (!error.response) {
      // Set offline mode to avoid repeated attempts
      if (!isOfflineMode) {
        // Only log once when entering offline mode
        console.info('Using offline mode with localStorage (API server not available)');
        isOfflineMode = true;
      }
      
      return simulateOfflineResponse(error.config);
    }
    
    return Promise.reject(error);
  }
);

interface ApiConfig {
  url?: string;
  method?: string;
  data?: string;
}

// Simulate responses based on localStorage when offline
function simulateOfflineResponse(config: ApiConfig = {}) {
  // Extract endpoint and method from the config
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();
  
  // Simple path parsing
  const path = url.split('/').filter(Boolean);
  const resource = path[0];  // products, chat-responses, etc.
  const id = path[1];        // Optional ID
  
  // Data from request body
  const requestData = config.data ? JSON.parse(config.data) : {};
  
  // Simulate delay
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Handle different resources
        switch (resource) {
          case 'products':
            return resolve({ data: handleProductsResource(method, id, requestData) });
          case 'chat-responses':
            return resolve({ data: handleChatResponsesResource(method, id, requestData) });
          case 'chat':
            return resolve({ data: handleChatResource(method, requestData) });
          default:
            return resolve({ data: null });
        }
      } catch (err) {
        console.error('Error in offline mode:', err);
        return resolve({ data: null });
      }
    }, 300); // Small delay to simulate network
  });
}

// Handle products resource in offline mode
function handleProductsResource(method: string, id: string | undefined, data: Partial<Product>) {
  const storageKey = 'furnitureProducts';
  let products = JSON.parse(localStorage.getItem(storageKey) || '[]') as Product[];
  
  switch (method) {
    case 'get':
      if (id) {
        // Return single product
        return products.find((p: Product) => p.id === id || p._id === id) || null;
      }
      // Return all products
      return products;
      
    case 'post': {
      // Create new product
      const newProduct: Product = {
        ...data as Product,
        _id: `local_${Date.now()}`,
        id: `local_${Date.now()}`
      };
      products.push(newProduct);
      localStorage.setItem(storageKey, JSON.stringify(products));
      return newProduct;
    }
      
    case 'put': {
      // Update product
      products = products.map((p: Product) => (p.id === id || p._id === id) ? { ...p, ...data } : p);
      localStorage.setItem(storageKey, JSON.stringify(products));
      return products.find((p: Product) => p.id === id || p._id === id) || null;
    }
      
    case 'delete':
      // Delete product
      products = products.filter((p: Product) => p.id !== id && p._id !== id);
      localStorage.setItem(storageKey, JSON.stringify(products));
      return { success: true };
      
    default:
      return null;
  }
}

// Handle chat responses resource in offline mode
function handleChatResponsesResource(method: string, id: string | undefined, data: Partial<ChatResponse>) {
  const storageKey = 'chatResponses';
  let responses = JSON.parse(localStorage.getItem(storageKey) || '[]') as ChatResponse[];
  
  switch (method) {
    case 'get':
      if (id) {
        // Return single response
        return responses.find((r: ChatResponse) => r.id === id || r._id === id) || null;
      }
      // Return all responses
      return responses;
      
    case 'post': {
      // Create new response
      const newResponse: ChatResponse = {
        ...data as ChatResponse,
        _id: `local_${Date.now()}`,
        id: `local_${Date.now()}`
      };
      responses.push(newResponse);
      localStorage.setItem(storageKey, JSON.stringify(responses));
      return newResponse;
    }
      
    case 'put': {
      // Update response
      responses = responses.map((r: ChatResponse) => (r.id === id || r._id === id) ? { ...r, ...data } : r);
      localStorage.setItem(storageKey, JSON.stringify(responses));
      return responses.find((r: ChatResponse) => r.id === id || r._id === id) || null;
    }
      
    case 'delete':
      // Delete response
      responses = responses.filter((r: ChatResponse) => r.id !== id && r._id !== id);
      localStorage.setItem(storageKey, JSON.stringify(responses));
      return { success: true };
      
    default:
      return null;
  }
}

// Handle chat resource in offline mode
async function handleChatResource(method: string, data: {query?: string, message?: string}) {
  if (method === 'post' && (data.query || data.message)) {
    const query = data.query || data.message || '';
    
    try {
      // In offline mode, use localStorage directly without attempting server connection
      if (isOfflineMode) {
        return handleOfflineChatResponse(query);
      }
      
      try {
        // Use the chat endpoint which forwards to Gemini API
        const response = await fetch('http://localhost:3002/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            return { answer: result.data };
          }
        }
        // If we reach here, the request was made but didn't return valid data
        // Fall back to offline mode
        return handleOfflineChatResponse(query);
      } catch (apiError) {
        console.error('Error calling chat API, falling back to local responses', apiError);
        // Set offline mode since we couldn't reach the server
        isOfflineMode = true;
        return handleOfflineChatResponse(query);
      }
    } catch (error) {
      console.error('Error in chat service:', error);
      
      // Safe fallback
      return { answer: "I'm having trouble processing your request right now. Please try again later." };
    }
  }
  
  return null;
}

// Helper function to get responses from localStorage
function handleOfflineChatResponse(query: string) {
  // Fallback to localStorage
  const responses = JSON.parse(localStorage.getItem('chatResponses') || '[]') as ChatResponse[];
  const queryLower = query.toLowerCase();
  
  // Find a matching response
  for (const response of responses) {
    if (queryLower.includes(response.question.toLowerCase())) {
      return { answer: response.answer };
    }
  }
  
  // Default response if no match found
  return { answer: "I'm sorry, I don't have information on that topic. Please contact us for more details." };
}

export default enhancedApi; 