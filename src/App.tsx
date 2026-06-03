import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./context/CartContext";

const Index = lazy(() => import("./pages/Index.tsx"));
const StorePage = lazy(() => import("./pages/StorePage.tsx"));
const IsraelMezuzahsCategoryPage = lazy(() => import("./pages/IsraelMezuzahsCategoryPage.tsx"));
const SenseProProductPage = lazy(() => import("./pages/SenseProProductPage.tsx"));
const CartPage = lazy(() => import("./pages/CartPage.tsx"));
const InfoPage = lazy(() => import("./pages/InfoPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <CartProvider>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sense-pro" element={<SenseProProductPage />} />
          <Route path="/product/sense-pro" element={<SenseProProductPage />} />
          <Route path="/store/:storeId" element={<StorePage />} />
          <Route path="/store/s2/category/:categorySlug" element={<IsraelMezuzahsCategoryPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
