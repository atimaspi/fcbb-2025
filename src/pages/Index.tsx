
import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductionHeroCarousel from "@/components/hero/ProductionHeroCarousel";
import MissionVisionSection from "@/components/MissionVisionSection";
import NationalTeamsSection from "@/components/NationalTeamsSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import AnimatedStatsSection from "@/components/AnimatedStatsSection";
import ProductionPartnersSection from "@/components/partners/ProductionPartnersSection";
import FibaStyleLiveResults from "@/components/FibaStyleLiveResults";
import FibaNewsSection from "@/components/FibaNewsSection";
import FibaStyleHeader from "@/components/header/FibaStyleHeader";
import Footer from "@/components/Footer";
import { useTranslation } from "@/contexts/InternationalizationContext";
import SEO from "@/components/SEO";

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("FCBB Premium Website - Página Principal Carregada");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="FCBB - Federação Cabo-verdiana de Basquetebol | Orgulho Nacional, Talento Global"
        description="Website oficial da Federação Cabo-verdiana de Basquetebol. Do bairro para o mundo - acompanhe as seleções nacionais, competições, projetos de desenvolvimento e parcerias internacionais. Referência africana em basquetebol."
        keywords="basquetebol, Cabo Verde, FCBB, federação, FIBA, seleções nacionais, AfroBasket, desporto cabo-verdiano, competições, formação, desenvolvimento desportivo"
      />
      
      <FibaStyleHeader />
      
      <main>
        {/* Full-Screen Hero Carousel */}
        <ProductionHeroCarousel />

        {/* Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <MissionVisionSection />
        </motion.div>

        {/* National Teams Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <NationalTeamsSection />
        </motion.div>

        {/* Live Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FibaStyleLiveResults />
        </motion.div>

        {/* Featured Projects Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FeaturedProjectsSection />
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AnimatedStatsSection />
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

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ProductionPartnersSection />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
