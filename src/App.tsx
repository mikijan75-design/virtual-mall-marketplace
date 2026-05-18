import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
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
import ContactPage from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();
const ZOOM_STORAGE_KEY = "mall-global-zoom";
const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));

const GlobalZoomShell = ({ children }: { children: ReactNode }) => {
  const [zoom, setZoom] = useState(() => {
    const savedZoom = window.localStorage.getItem(ZOOM_STORAGE_KEY);
    const parsedZoom = savedZoom ? Number(savedZoom) : 1;
    return Number.isFinite(parsedZoom) ? clampZoom(parsedZoom) : 1;
  });

  useEffect(() => {
    window.localStorage.setItem(ZOOM_STORAGE_KEY, String(zoom));
  }, [zoom]);

  useEffect(() => {
    const updateZoom = (direction: 1 | -1 | 0) => {
      setZoom((current) => (direction === 0 ? 1 : clampZoom(current + direction * ZOOM_STEP)));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;

      if (["Equal", "NumpadAdd"].includes(event.code) || event.key === "+") {
        event.preventDefault();
        updateZoom(1);
      } else if (["Minus", "NumpadSubtract"].includes(event.code) || event.key === "-") {
        event.preventDefault();
        updateZoom(-1);
      } else if (["Digit0", "Numpad0"].includes(event.code)) {
        event.preventDefault();
        updateZoom(0);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      updateZoom(event.deltaY < 0 ? 1 : -1);
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <div style={{ zoom }}>{children}</div>
      <div
        className="fixed bottom-4 left-4 z-[1000] flex overflow-hidden rounded-lg border border-border bg-card/95 text-card-foreground shadow-lg backdrop-blur"
        dir="ltr"
        aria-label="בקרת זום גלובלית"
      >
        <button
          type="button"
          onClick={() => setZoom((current) => clampZoom(current - ZOOM_STEP))}
          disabled={zoom <= MIN_ZOOM}
          className="grid h-10 w-10 place-items-center border-r border-border transition-colors hover:bg-secondary disabled:opacity-40"
          aria-label="הקטן את כל האתר"
          title="הקטן"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom(1)}
          className="grid h-10 w-10 place-items-center border-r border-border transition-colors hover:bg-secondary"
          aria-label="אפס זום גלובלי"
          title="איפוס"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((current) => clampZoom(current + ZOOM_STEP))}
          disabled={zoom >= MAX_ZOOM}
          className="grid h-10 w-10 place-items-center transition-colors hover:bg-secondary disabled:opacity-40"
          aria-label="הגדל את כל האתר"
          title="הגדל"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <CartProvider>
        <GlobalZoomShell>
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
        </GlobalZoomShell>
      </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
