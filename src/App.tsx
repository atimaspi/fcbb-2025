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

// Submenu pages
import SobreHistoriaPage from "./pages/submenu/SobreHistoriaPage";
import SobreMissaoVisaoPage from "./pages/submenu/SobreMissaoVisaoPage";
import SobreDirecaoPage from "./pages/submenu/SobreDirecaoPage";
import SobreOrgaosSociaisPage from "./pages/submenu/SobreOrgaosSociaisPage";
import SobreEstatutosPage from "./pages/submenu/SobreEstatutosPage";
import SelecoesSenitorsPage from "./pages/submenu/SelecoesSenitorsPage";
import CompeticoesLigaNacionalPage from "./pages/submenu/CompeticoesLigaNacionalPage";
import CompeticoesTacaPage from "./pages/submenu/CompeticoesTacaPage";
import ResultadosPage from "./pages/submenu/ResultadosPage";
import EstatisticasPage from "./pages/submenu/EstatisticasPage";

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
                    
                    {/* Main pages */}
                    <Route path="/noticias" element={<NoticiasPage />} />
                    <Route path="/selecoes" element={<SelecoesPage />} />
                    <Route path="/competicoes" element={<CompeticoesPage />} />
                    <Route path="/clubes" element={<ClubesPage />} />
                    <Route path="/galeria" element={<GaleriaPage />} />
                    <Route path="/sobre" element={<SobrePage />} />
                    <Route path="/contactos" element={<ContactosPage />} />
                    
                    {/* Sobre submenu */}
                    <Route path="/sobre/historia" element={<SobreHistoriaPage />} />
                    <Route path="/sobre/missao-visao" element={<SobreMissaoVisaoPage />} />
                    <Route path="/sobre/direcao" element={<SobreDirecaoPage />} />
                    <Route path="/sobre/orgaos-sociais" element={<SobreOrgaosSociaisPage />} />
                    <Route path="/sobre/estatutos" element={<SobreEstatutosPage />} />
                    <Route path="/sobre/contactos" element={<ContactosPage />} />
                    
                    {/* Seleções submenu */}
                    <Route path="/selecoes/senior-masculina" element={<SelecoesSenitorsPage />} />
                    <Route path="/selecoes/senior-feminina" element={<SelecoesSenitorsPage />} />
                    <Route path="/selecoes/feminina" element={<SelecoesSenitorsPage />} />
                    <Route path="/selecoes/sub-18-masculina" element={<SelecoesSenitorsPage />} />
                    <Route path="/selecoes/sub-18-feminina" element={<SelecoesSenitorsPage />} />
                    <Route path="/selecoes/sub-16-masculina" element={<SelecoesSenitorsPage />} />
                    <Route path="/selecoes/sub-16-feminina" element={<SelecoesSenitorsPage />} />
                    
                    {/* Competições submenu */}
                    <Route path="/competicoes/liga-nacional" element={<CompeticoesLigaNacionalPage />} />
                    <Route path="/competicoes/taca-cabo-verde" element={<CompeticoesTacaPage />} />
                    <Route path="/competicoes/super-taca" element={<CompeticoesTacaPage />} />
                    <Route path="/competicoes/nacional-masculino" element={<CompeticoesLigaNacionalPage />} />
                    <Route path="/competicoes/competicoes-regionais" element={<CompeticoesLigaNacionalPage />} />
                    <Route path="/competicoes/regionais" element={<CompeticoesLigaNacionalPage />} />
                    <Route path="/competicoes/calendario" element={<CompeticoesLigaNacionalPage />} />
                    <Route path="/competicoes/classificacoes" element={<CompeticoesLigaNacionalPage />} />
                    
                    {/* Resultados submenu */}
                    <Route path="/resultados" element={<ResultadosPage />} />
                    <Route path="/resultados/ao-vivo" element={<ResultadosPage />} />
                    <Route path="/resultados/classificacoes" element={<ResultadosPage />} />
                    <Route path="/resultados/fiba-livestats" element={<ResultadosPage />} />
                    <Route path="/estatisticas" element={<EstatisticasPage />} />
                    
                    {/* Other submenu routes */}
                    <Route path="/transferencias" element={<ClubesPage />} />
                    <Route path="/formacao" element={<ClubesPage />} />
                    <Route path="/arbitragem" element={<ClubesPage />} />
                    <Route path="/videos" element={<GaleriaPage />} />
                    <Route path="/transmissoes" element={<GaleriaPage />} />
                    <Route path="/imprensa" element={<NoticiasPage />} />
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
