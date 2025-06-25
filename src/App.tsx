
import React from 'react';
import './App.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { InternationalizationProvider } from "@/contexts/InternationalizationContext";
import SafeErrorBoundary from "@/components/SafeErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

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
          <InternationalizationProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </InternationalizationProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </SafeErrorBoundary>
  );
};

export default App;
