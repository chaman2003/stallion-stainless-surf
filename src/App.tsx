import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Heritage from "./pages/Heritage";
import Contact from "./pages/Contact";
import Showrooms from "./pages/Showrooms";
import Dealers from "./pages/Dealers";
import Sustainability from "./pages/Sustainability";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/Dashboard";
import Navigation from "./components/Navigation";
import ChatBot from "./components/ChatBot";
import Account from "./pages/Account";
import Register from "./pages/Register";
import SofaType from "./pages/SofaType";

const queryClient = new QueryClient();

// Initialize demo data
const initializeDemoData = () => {
  // Sample users
  if (!localStorage.getItem('users')) {
    const users = [
      {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        id: 'user2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123'
      }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Sample furniture products - just dining and bedroom, no living room
  if (!localStorage.getItem('furnitureProducts')) {
    const products = [
      {
        id: 'table1',
        name: 'Nova Dining Table',
        description: 'Elegant dining table with a natural oak finish and seating for six.',
        price: 899.99,
        category: 'dining-room',
        image: ''
      },
      {
        id: 'bed1',
        name: 'Serene King Bed',
        description: 'A comfortable king-sized bed with a padded headboard and sturdy frame.',
        price: 1499.99,
        category: 'bedroom',
        image: ''
      }
    ];
    localStorage.setItem('furnitureProducts', JSON.stringify(products));
  }

  // Sample chat responses
  if (!localStorage.getItem('chatResponses')) {
    const responses = [
      {
        id: 'resp1',
        question: 'shipping',
        answer: 'We offer free shipping on all orders over $500. Standard delivery takes 3-5 business days, while premium delivery with assembly service takes 7-10 business days.'
      },
      {
        id: 'resp2',
        question: 'return policy',
        answer: 'Our return policy allows you to return items within 30 days of delivery. Items must be in original condition with all packaging. Custom orders cannot be returned unless damaged.'
      },
      {
        id: 'resp3',
        question: 'warranty',
        answer: 'All our furniture comes with a 2-year warranty against manufacturing defects. Premium collections have extended 5-year warranties. Warranty does not cover damage from misuse or normal wear and tear.'
      },
      {
        id: 'resp4',
        question: 'sustainable',
        answer: 'Sustainability is core to our mission. We use responsibly sourced wood from certified forests, water-based finishes, and recycled materials wherever possible. Our packaging is 100% recyclable.'
      },
      {
        id: 'resp5',
        question: 'material',
        answer: 'We use premium materials including solid oak, walnut, maple, high-resilience foam, and top-grain leather. All textiles are tested for durability and sustainability.'
      }
    ];
    localStorage.setItem('chatResponses', JSON.stringify(responses));
  }
};

// Layout component with common Navigation
const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <ChatBot />
    </>
  );
};

// Admin layout without navigation and chatbot
const AdminLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize demo data when app loads
    initializeDemoData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
            
            <Route element={<Layout />}>
              {/* Home Route */}
              <Route path="/" element={<Home />} />
              
              {/* Heritage Routes */}
              <Route path="/heritage" element={<Heritage />} />
              
              {/* Sustainability Route */}
              <Route path="/sustainability" element={<Sustainability />} />
              
              {/* Sofa Types */}
              <Route path="/category/living-room/sofas/:type" element={<SofaType />} />
              
              {/* Contact Routes */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/showrooms" element={<Showrooms />} />
              <Route path="/dealers" element={<Dealers />} />
              
              {/* Login and Registration Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Account Routes */}
              <Route path="/account" element={<Account />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
