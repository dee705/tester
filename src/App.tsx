import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"; // ✅ Import ThemeProvider
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConcertPopup from "./components/ConcertPopup";

// New imports for separate pages + menu
import Menu from "./components/Menu";
import About from "./pages/About";
import Music from "./pages/Music";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

// 🔹 Toggle popup on/off here
const SHOW_POPUP = false; // change to true to enable

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider
        defaultTheme="light"
        storageKey="vite-ui-theme"
        attribute="class" // ✅ Ensures it applies dark/light class properly
      >
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Global menu; use link clicks to go to each page */}
          <Menu />

          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/music" element={<Music />} />
              <Route path="/contact" element={<Contact />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* ConcertPopup is global and can be toggled */}
          {SHOW_POPUP && <ConcertPopup />}
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;