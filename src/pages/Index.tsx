
import React, { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { useSafeDOM } from '@/hooks/useSafeDOM';

// Lazy load components to prevent initialization issues
const FCBBLayout = lazy(() => import('@/components/layout/FCBBLayout').catch(() => ({
  default: () => <div>Erro ao carregar layout</div>
})));

const Index = () => {
  const { safeAddClass, isClient } = useSafeDOM();
  
  // Safe initialization with better error handling
  useEffect(() => {
    console.log('Index page mounted successfully');
    
    // Only run DOM manipulation if we're in the client
    if (!isClient) {
      console.log('Skipping DOM manipulation - not in client environment');
      return;
    }
    
    // Safe DOM manipulation with proper checks
    const addPageLoadedClass = () => {
      try {
        const body = document?.body;
        if (body) {
          const success = safeAddClass(body, 'page-loaded');
          console.log('Page loaded class added:', success);
        } else {
          console.warn('Document body not available');
        }
      } catch (error) {
        console.warn('Error in page initialization:', error);
      }
    };

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(addPageLoadedClass, 100);
    
    return () => {
      console.log('Index page cleanup');
      clearTimeout(timeoutId);
    };
  }, [safeAddClass, isClient]);

  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D72] mx-auto mb-4"></div>
        <p className="text-gray-600">A carregar FCBB...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <SEO 
        title="Federação Cabo-verdiana de Basquetebol - FCBB"
        description="Site oficial da Federação Cabo-verdiana de Basquetebol. Notícias, competições, equipas e toda a informação sobre o basquetebol em Cabo Verde."
        keywords="basquetebol, Cabo Verde, FCBB, federação, desporto, competições"
      />
      
      <Suspense fallback={<LoadingFallback />}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FCBBLayout />
        </motion.div>
      </Suspense>
    </div>
  );
};

export default Index;
