import React from 'react';
import './App.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { InternationalizationProvider } from "@/contexts/InternationalizationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import SafeErrorBoundary from "@/components/SafeErrorBoundary";
import ModernIndex from "./pages/ModernIndex";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NoticiasPage from "./pages/NoticiasPage";
import SelecoesPage from "./pages/SelecoesPage";
import CompeticoesPage from "./pages/CompeticoesPage";
import ClubesPage from "./pages/ClubesPage";
import GaleriaPage from "./pages/GaleriaPage";
import SobrePage from "./pages/SobrePage";
import ContactosPage from "./pages/ContactosPage";
import AreaReservadaPage from "./pages/AreaReservadaPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors or 403s
        if (error?.status === 403 || error?.status === 401) {
          return false;
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => {
  console.log('App initializing...');
  
  return (
    <SafeErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <InternationalizationProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<ModernIndex />} />
                    <Route path="/old" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/area-reservada" element={<AreaReservadaPage />} />
                    <Route path="/noticias" element={<NoticiasPage />} />
                    <Route path="/selecoes" element={<SelecoesPage />} />
                    <Route path="/competicoes" element={<CompeticoesPage />} />
                    <Route path="/clubes" element={<ClubesPage />} />
                    <Route path="/galeria" element={<GaleriaPage />} />
                    <Route path="/sobre" element={<SobrePage />} />
                    <Route path="/contactos" element={<ContactosPage />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </InternationalizationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </SafeErrorBoundary>
  );
};

export default App;
