
import React from 'react';
import SEO from '@/components/SEO';
import ModernHeader from '@/components/header/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, description, keywords, image, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <SEO 
        title={`${title} - FCBB`}
        description={description}
        keywords={keywords}
        image={image}
      />
      
      <ModernHeader />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
          <div className="cv-container py-8">
            <header className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-cv-blue mb-4">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </header>
            <section className="space-y-8">
              {children}
            </section>
          </div>
        </div>
      </motion.main>

      <ModernFooter />
    </div>
  );
};

export default PageLayout;
