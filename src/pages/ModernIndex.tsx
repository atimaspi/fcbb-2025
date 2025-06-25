
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import ModernHeader from '@/components/header/ModernHeader';
import ModernHero from '@/components/ModernHero';
import LiveGames from '@/components/LiveGames';
import ModernNews from '@/components/ModernNews';
import ModernFooter from '@/components/ModernFooter';
import { useContentData } from '@/hooks/useContentData';

const ModernIndex = () => {
  const { isContentLoading } = useContentData();

  useEffect(() => {
    console.log('Modern Index page mounted successfully');
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Federação Cabo-verdiana de Basquetebol - FCBB"
        description="Site oficial da Federação Cabo-verdiana de Basquetebol. Notícias, competições, seleções e toda a informação sobre o basquetebol em Cabo Verde."
        keywords="basquetebol, Cabo Verde, FCBB, federação, desporto, competições, seleções"
      />
      
      <ModernHeader />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        <ModernHero />
        <LiveGames />
        <ModernNews />
      </motion.main>

      <ModernFooter />
    </div>
  );
};

export default ModernIndex;
