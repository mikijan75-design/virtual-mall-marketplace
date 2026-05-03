import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import StorePage from "./pages/StorePage.tsx";
import IsraelMezuzahsCategoryPage from "./pages/IsraelMezuzahsCategoryPage.tsx";
import SenseProProductPage from "./pages/SenseProProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import InfoPage from "./pages/InfoPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sense-pro" element={<SenseProProductPage />} />
          <Route path="/product/sense-pro" element={<SenseProProductPage />} />
          <Route path="/store/:storeId" element={<StorePage />} />
          <Route path="/store/s2/category/:categorySlug" element={<IsraelMezuzahsCategoryPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
