
import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductionHeroCarousel from "@/components/hero/ProductionHeroCarousel";
import PremiumStatsSection from "@/components/PremiumStatsSection";
import FibaStyleLiveResults from "@/components/FibaStyleLiveResults";
import FibaNewsSection from "@/components/FibaNewsSection";
import ProductionPartnersSection from "@/components/partners/ProductionPartnersSection";
import TeamsSection from "@/components/TeamsSection";
import FibaStyleHeader from "@/components/header/FibaStyleHeader";
import Footer from "@/components/Footer";
import { useTranslation } from "@/contexts/InternationalizationContext";
import SEO from "@/components/SEO";

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("Index page loaded - FCBB Production Website initialized");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A1F2E] to-[#0B132B]">
      <SEO 
        title="FCBB - Federação Cabo-verdiana de Basquetebol"
        description="Website oficial da Federação Cabo-verdiana de Basquetebol. Acompanhe as últimas notícias, resultados, classificações e informações sobre o basquetebol em Cabo Verde."
        keywords="basquetebol, Cabo Verde, FCBB, federação, desporto, competições, seleções nacionais"
      />
      
      <FibaStyleHeader />
      
      <main>
        {/* Production Hero Carousel */}
        <ProductionHeroCarousel />

        {/* Live Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FibaStyleLiveResults />
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <PremiumStatsSection />
        </motion.div>

        {/* News Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FibaNewsSection />
        </motion.div>

        {/* Teams Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <TeamsSection />
        </motion.div>

        {/* Production Partners Section */}
        <ProductionPartnersSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
