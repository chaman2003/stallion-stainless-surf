
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Placeholder = () => (
  <div className="container mx-auto px-4 pt-32">
    <h1 className="text-4xl font-serif mb-4">Coming Soon</h1>
    <p className="text-gray-600">This page is under construction.</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/history" element={<Placeholder />} />
          <Route path="/vision" element={<Placeholder />} />
          <Route path="/craftsmanship" element={<Placeholder />} />
          <Route path="/artisans" element={<Placeholder />} />
          <Route path="/process" element={<Placeholder />} />
          <Route path="/materials" element={<Placeholder />} />
          <Route path="/showrooms" element={<Placeholder />} />
          <Route path="/dealers" element={<Placeholder />} />
          <Route path="/contact" element={<Placeholder />} />
          <Route path="/category/:categoryId" element={<Placeholder />} />
          <Route path="/account" element={<Placeholder />} />
          <Route path="/cart" element={<Placeholder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
