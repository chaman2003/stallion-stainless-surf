import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryBedroom from "./pages/CategoryBedroom";
import GDriveGallery from "./pages/GDriveGallery";
import DiningRoom from "./pages/DiningRoom";
import LivingRoom from "./pages/LivingRoom";
import Heritage from "./pages/Heritage";
import History from "./pages/History";
import Vision from "./pages/Vision";
import Craftsmanship from "./pages/Craftsmanship";
import Artisans from "./pages/Artisans";
import Process from "./pages/Process";
import Materials from "./pages/Materials";
import Contact from "./pages/Contact";
import Showrooms from "./pages/Showrooms";
import Dealers from "./pages/Dealers";
import Sustainability from "./pages/Sustainability";
import Navigation from "./components/Navigation";

// New living room pages
import LivingRoomSofas from "./pages/LivingRoomSofas";
import LivingRoomFurniture from "./pages/LivingRoomFurniture";
import SofaType from "./pages/SofaType";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Heritage Routes */}
          <Route path="/heritage" element={<Heritage />} />
          <Route path="/history" element={<History />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/process" element={<Process />} />
          <Route path="/materials" element={<Materials />} />
          
          {/* Sustainability Route */}
          <Route path="/sustainability" element={<Sustainability />} />
          
          {/* Legacy Routes - kept for backward compatibility */}
          <Route path="/vision" element={<Vision />} />
          <Route path="/craftsmanship" element={<Craftsmanship />} />
          
          {/* Product Routes */}
          <Route path="/category/bedroom" element={<CategoryBedroom />} />
          <Route path="/category/dining-room" element={<DiningRoom />} />
          <Route path="/category/living-room" element={<LivingRoom />} />
          
          {/* Living Room Subcategories */}
          <Route path="/category/living-room/sofas" element={<LivingRoomSofas />} />
          <Route path="/category/living-room/pouffe" element={<LivingRoomFurniture />} />
          <Route path="/category/living-room/corner-table" element={<LivingRoomFurniture />} />
          <Route path="/category/living-room/console-table" element={<LivingRoomFurniture />} />
          <Route path="/category/living-room/coffee-table" element={<LivingRoomFurniture />} />
          
          {/* Sofa Types */}
          <Route path="/category/living-room/sofas/straight" element={<SofaType />} />
          <Route path="/category/living-room/sofas/corner" element={<SofaType />} />
          <Route path="/category/living-room/sofas/curved" element={<SofaType />} />
          <Route path="/category/living-room/sofas/u-shaped" element={<SofaType />} />
          <Route path="/category/living-room/sofas/recliner" element={<SofaType />} />
          <Route path="/category/living-room/sofas/sofa-cum-bed" element={<SofaType />} />
          
          {/* Contact Routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/showrooms" element={<Showrooms />} />
          <Route path="/dealers" element={<Dealers />} />
          
          <Route path="/gdrive-gallery" element={<GDriveGallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
