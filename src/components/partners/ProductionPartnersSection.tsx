
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Facebook, Youtube, Twitter, Instagram, Trophy, Medal, Award, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website?: string;
  tier: 'platina' | 'ouro' | 'prata';
}

// Mock JSON structure for CMS integration
const partnersData: Partner[] = [
  // Platina Partners 🥇
  {
    id: 1,
    name: "FIBA",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=100&fit=crop",
    description: "Federação Internacional de Basquetebol",
    website: "https://www.fiba.basketball",
    tier: "platina"
  },
  {
    id: 2,
    name: "Governo de Cabo Verde",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop",
    description: "Parceiro Institucional Principal",
    tier: "platina"
  },
  {
    id: 3,
    name: "Comité Olímpico CV",
    logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=200&h=100&fit=crop",
    description: "Comité Olímpico Cabo-verdiano",
    tier: "platina"
  },

  // Ouro Partners 🥈
  {
    id: 4,
    name: "CV Telecom",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=200&h=100&fit=crop",
    description: "Telecomunicações de Cabo Verde",
    tier: "ouro"
  },
  {
    id: 5,
    name: "Cabo Verde Airlines",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=200&h=100&fit=crop",
    description: "Companhia Aérea Nacional",
    tier: "ouro"
  },
  {
    id: 6,
    name: "Banco Comercial",
    logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=200&h=100&fit=crop",
    description: "Parceiro Financeiro",
    tier: "ouro"
  },
  {
    id: 7,
    name: "ENACOL",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200&h=100&fit=crop",
    description: "Energia e Combustíveis",
    tier: "ouro"
  },

  // Prata Partners 🥉
  {
    id: 8,
    name: "Molten",
    logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=100&fit=crop",
    description: "Equipamentos Oficiais",
    tier: "prata"
  },
  {
    id: 9,
    name: "Spalding",
    logo: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=200&h=100&fit=crop",
    description: "Bolas Oficiais FCBB",
    tier: "prata"
  },
  {
    id: 10,
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&h=100&fit=crop",
    description: "Vestuário Desportivo",
    tier: "prata"
  },
  {
    id: 11,
    name: "Under Armour",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=200&h=100&fit=crop",
    description: "Performance Gear",
    tier: "prata"
  },
  {
    id: 12,
    name: "Gatorade",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=100&fit=crop",
    description: "Hidratação Oficial",
    tier: "prata"
  },
  {
    id: 13,
    name: "Wilson",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop",
    description: "Equipamentos Desportivos",
    tier: "prata"
  }
];

interface TierConfig {
  title: string;
  icon: React.ComponentType<any>;
  medal: string;
  gradient: string;
  glowColor: string;
  borderGradient: string;
}

const tierConfigs: Record<string, TierConfig> = {
  platina: {
    title: "Parceiros Platina",
    icon: Trophy,
    medal: "🥇",
    gradient: "from-gray-200 via-white to-gray-300",
    glowColor: "shadow-white/50",
    borderGradient: "from-gray-300 via-white to-gray-400"
  },
  ouro: {
    title: "Parceiros Ouro", 
    icon: Medal,
    medal: "🥈",
    gradient: "from-amber-400 via-yellow-300 to-amber-500",
    glowColor: "shadow-yellow-400/50",
    borderGradient: "from-amber-400 via-yellow-300 to-amber-600"
  },
  prata: {
    title: "Parceiros Prata",
    icon: Award,
    medal: "🥉",
    gradient: "from-slate-400 via-gray-300 to-slate-500",
    glowColor: "shadow-slate-400/50",
    borderGradient: "from-slate-400 via-gray-300 to-slate-600"
  }
};

const ProductionPartnersSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [visiblePartners, setVisiblePartners] = useState<Set<number>>(new Set());

  // Group partners by tier
  const partnersByTier = {
    platina: partnersData.filter(p => p.tier === 'platina'),
    ouro: partnersData.filter(p => p.tier === 'ouro'),
    prata: partnersData.filter(p => p.tier === 'prata')
  };

  // Newsletter subscription handler
  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubscribing(false);
    setEmail('');
    console.log('Newsletter subscription:', email);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const partnerId = parseInt(entry.target.getAttribute('data-partner-id') || '0');
            setVisiblePartners(prev => new Set(prev).add(partnerId));
          }
        });
      },
      { threshold: 0.2, rootMargin: '100px' }
    );

    const partnerElements = document.querySelectorAll('[data-partner-id]');
    partnerElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const PartnerLogo = ({ partner, index, tierIndex }: { partner: Partner; index: number; tierIndex: number }) => {
    const config = tierConfigs[partner.tier];
    const isVisible = visiblePartners.has(partner.id);

    return (
      <motion.figure
        data-partner-id={partner.id}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isVisible ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            delay: (tierIndex * 0.3) + (index * 0.1),
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        } : {}}
        whileHover={{ 
          scale: 1.1,
          rotateY: 10,
          transition: { duration: 0.3 }
        }}
        className="group cursor-pointer relative"
      >
        <div className={`relative overflow-hidden rounded-2xl p-6 h-32 transition-all duration-500 bg-gradient-to-br ${config.borderGradient} p-[2px]`}>
          {/* Metallic Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 rounded-2xl"></div>
          
          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${config.glowColor} blur-xl`}></div>
          
          {/* Inner Container */}
          <div className="relative z-10 bg-black/40 backdrop-blur-sm rounded-xl h-full flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-500">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Logo */}
            <div className="relative z-10">
              <img 
                src={partner.logo} 
                alt={`${partner.name} - ${partner.description}`}
                className="max-h-20 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                loading="lazy"
              />
            </div>

            {/* Hover Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-xl">
              <h4 className="font-bold text-sm mb-1">{partner.name}</h4>
              <p className="text-xs text-gray-300 mb-2">{partner.description}</p>
              {partner.website && (
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cv-yellow text-xs hover:underline"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Visitar Site
                </a>
              )}
            </div>
          </div>
        </div>
        
        <figcaption className="sr-only">
          {partner.name} - {partner.description}
        </figcaption>
      </motion.figure>
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0B132B] via-[#1A1F2E] to-[#0B132B] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Cabo Verde Flag Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cv-yellow via-cv-red to-cv-blue"></div>
        
        {/* Basketball Court Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          <line x1="0" y1="400" x2="1200" y2="400" stroke="white" strokeWidth="2"/>
          <circle cx="300" cy="400" r="80" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="900" cy="400" r="80" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="600" cy="400" r="120" fill="none" stroke="white" strokeWidth="3"/>
        </svg>

        {/* Cabo Verde Wave Pattern */}
        <svg className="absolute bottom-0 w-full h-40" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z" fill="rgba(247, 209, 22, 0.05)"/>
          <path d="M0,120 Q400,80 800,120 T1200,120 L1200,200 L0,200 Z" fill="rgba(207, 32, 39, 0.05)"/>
          <path d="M0,140 Q500,100 1000,140 T1200,140 L1200,200 L0,200 Z" fill="rgba(0, 56, 147, 0.05)"/>
        </svg>
      </div>

      <div className="cv-container relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 mb-12 border-b border-white/10"
        >
          <div className="flex items-center space-x-4">
            <Mail className="w-8 h-8 text-cv-yellow" />
            <h2 className="text-2xl font-bold font-display">NEWSLETTER FCBB</h2>
          </div>
          
          <form onSubmit={handleNewsletterSubscription} className="flex items-center space-x-4 flex-1 max-w-md">
            <Input
              type="email"
              placeholder="O seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cv-yellow focus:ring-cv-yellow"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing}
              className="bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow text-white font-bold px-8 whitespace-nowrap hover:shadow-lg hover:shadow-cv-yellow/25"
            >
              {isSubscribing ? 'A SUBSCREVER...' : 'SUBSCREVER'}
            </Button>
          </form>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">SIGA-NOS</span>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                { icon: Youtube, color: 'hover:bg-red-600', label: 'YouTube' },
                { icon: Twitter, color: 'hover:bg-blue-400', label: 'Twitter' },
                { icon: Instagram, color: 'hover:bg-pink-600', label: 'Instagram' }
              ].map(({ icon: Icon, color, label }, index) => (
                <motion.a
                  key={label}
                  href="#"
                  className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center ${color} transition-all duration-300 hover:scale-110`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Seguir FCBB no ${label}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 font-display"
            style={{
              background: 'linear-gradient(135deg, #F7D116 0%, #FFFFFF 50%, #003893 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(247, 209, 22, 0.3)'
            }}
          >
            NOSSOS PARCEIROS
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Unidos pelo desenvolvimento do basquetebol cabo-verdiano
          </motion.p>
        </motion.header>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {Object.entries(partnersByTier).map(([tier, partners], tierIndex) => {
            const config = tierConfigs[tier];
            
            return (
              <motion.article
                key={tier}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: tierIndex * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                {/* Tier Header */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="mb-10"
                >
                  <motion.div
                    className={`inline-flex items-center space-x-4 px-8 py-4 rounded-2xl bg-gradient-to-r ${config.gradient} text-black shadow-2xl mb-8 border-2 border-white/20`}
                    animate={{
                      boxShadow: [
                        `0 0 20px rgba(255,255,255,0.3)`,
                        `0 0 40px rgba(255,255,255,0.5)`,
                        `0 0 20px rgba(255,255,255,0.3)`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-3xl" role="img">
                      {config.medal}
                    </span>
                    <config.icon className="w-8 h-8" />
                    <h2 className="text-xl font-bold font-display">
                      {config.title}
                    </h2>
                  </motion.div>
                </motion.div>

                {/* Partner Cards */}
                <div className="space-y-8">
                  {partners.map((partner, index) => (
                    <PartnerLogo 
                      key={partner.id} 
                      partner={partner} 
                      index={index}
                      tierIndex={tierIndex}
                    />
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-xl rounded-3xl p-12 max-w-4xl mx-auto border border-white/10 overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, #003893, #CF2027, #F7D116)",
                    "linear-gradient(45deg, #CF2027, #F7D116, #003893)",
                    "linear-gradient(45deg, #F7D116, #003893, #CF2027)",
                    "linear-gradient(45deg, #003893, #CF2027, #F7D116)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
                className="inline-block mb-6"
              >
                <Star className="w-16 h-16 text-cv-yellow" />
              </motion.div>
              
              <h3 className="text-4xl font-bold mb-6 text-white font-display">
                Torne-se Nosso Parceiro
              </h3>
              
              <p className="text-gray-300 mb-8 text-xl leading-relaxed max-w-2xl mx-auto">
                Junte-se ao desenvolvimento do basquetebol cabo-verdiano. 
                Construamos juntos o futuro do desporto nacional.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-cv-yellow/30 transition-all duration-500"
                >
                  SEJA NOSSO PARCEIRO
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cv-blue/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cv-red/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-cv-yellow/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default ProductionPartnersSection;
