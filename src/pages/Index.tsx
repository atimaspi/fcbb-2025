
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { useSafeDOM } from '@/hooks/useSafeDOM';

// Lazy load components to prevent initialization issues
const FCBBLayout = lazy(() => import('@/components/layout/FCBBLayout').catch(() => ({
  default: () => <div>Erro ao carregar layout</div>
})));

const Index = () => {
  const { safeAddClass } = useSafeDOM();
  
  // Safe initialization
  React.useEffect(() => {
    console.log('Index page mounted successfully');
    
    // Safe DOM manipulation example
    const body = document.body;
    safeAddClass(body, 'page-loaded');
    
    return () => {
      console.log('Index page cleanup');
    };
  }, [safeAddClass]);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Federação Cabo-verdiana de Basquetebol - FCBB"
        description="Site oficial da Federação Cabo-verdiana de Basquetebol. Notícias, competições, equipas e toda a informação sobre o basquetebol em Cabo Verde."
        keywords="basquetebol, Cabo Verde, FCBB, federação, desporto, competições"
      />
      
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D72] mx-auto mb-4"></div>
            <p className="text-gray-600">A carregar FCBB...</p>
          </div>
        </div>
      }>
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
