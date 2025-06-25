
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, MapPin, Trophy, Calendar, TrendingUp, Globe } from 'lucide-react';

const AnimatedStatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counters, setCounters] = useState({
    athletes: 0,
    clubs: 0,
    regions: 0,
    competitions: 0,
    years: 0,
    partners: 0
  });

  const finalStats = {
    athletes: 450,
    clubs: 18,
    regions: 10,
    competitions: 8,
    years: 35,
    partners: 12
  };

  const statsConfig = [
    {
      key: 'athletes',
      icon: Users,
      label: 'Atletas Federados',
      suffix: '+',
      color: 'from-[#E10600] to-[#FFD100]',
      description: 'Atletas ativos em todas as categorias'
    },
    {
      key: 'clubs',
      icon: Trophy,
      label: 'Clubes Afiliados',
      suffix: '',
      color: 'from-[#002D72] to-[#E10600]',
      description: 'Clubes oficialmente registados'
    },
    {
      key: 'regions',
      icon: MapPin,
      label: 'Regiões Integradas',
      suffix: '',
      color: 'from-[#FFD100] to-[#002D72]',
      description: 'Ilhas com atividade regular'
    },
    {
      key: 'competitions',
      icon: Calendar,
      label: 'Competições Anuais',
      suffix: '',
      color: 'from-[#002D72] to-[#FFD100]',
      description: 'Torneios organizados por ano'
    },
    {
      key: 'years',
      icon: TrendingUp,
      label: 'Anos de História',
      suffix: '',
      color: 'from-[#E10600] to-[#002D72]',
      description: 'Décadas de desenvolvimento'
    },
    {
      key: 'partners',
      icon: Globe,
      label: 'Parceiros Internacionais',
      suffix: '',
      color: 'from-[#FFD100] to-[#E10600]',
      description: 'Federações e organizações parceiras'
    }
  ];

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = { ...prev };
        let allComplete = true;

        Object.keys(finalStats).forEach(key => {
          const finalValue = finalStats[key as keyof typeof finalStats];
          const currentValue = prev[key as keyof typeof prev];
          const increment = Math.ceil(finalValue / steps);
          
          if (currentValue < finalValue) {
            newCounters[key as keyof typeof newCounters] = Math.min(currentValue + increment, finalValue);
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounters;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section className="py-20 bg-gradient-to-br from-[#002D72] via-[#1a237e] to-[#002D72] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FFD100" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="300" cy="200" r="100" fill="none" stroke="#E10600" strokeWidth="2" strokeDasharray="10,5"/>
          <circle cx="900" cy="600" r="120" fill="none" stroke="#FFD100" strokeWidth="2" strokeDasharray="15,10"/>
        </svg>
      </div>

      <div className="cv-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">
            <span className="bg-gradient-to-r from-[#FFD100] via-white to-[#E10600] bg-clip-text text-transparent">
              Números da Federação
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Décadas de crescimento e desenvolvimento do basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsConfig.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl text-center">
                {/* Icon */}
                <motion.div
                  className={`bg-gradient-to-r ${stat.color} p-6 rounded-2xl mx-auto mb-6 w-fit shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="h-12 w-12 text-white" />
                </motion.div>

                {/* Animated Number */}
                <motion.div
                  className="text-5xl md:text-6xl font-bold mb-4 font-display"
                  style={{
                    background: `linear-gradient(135deg, #FFD100 0%, #FFFFFF 50%, #E10600 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {counters[stat.key as keyof typeof counters]}{stat.suffix}
                </motion.div>

                {/* Label */}
                <h3 className="text-2xl font-bold text-white mb-3 font-display">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-6">
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: isInView ? `${(counters[stat.key as keyof typeof counters] / finalStats[stat.key as keyof typeof finalStats]) * 100}%` : '0%'
                      }}
                      transition={{ duration: 2, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#FFD100] via-[#E10600] to-[#002D72] rounded-3xl p-1 shadow-2xl max-w-4xl mx-auto">
            <div className="bg-[#002D72] rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-[#FFD100] mb-6 font-display">
                Marco Histórico 2024
              </h3>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Primeira participação cabo-verdiana no FIBA AfroBasket com classificação própria, 
                marcando uma nova era do basquetebol nacional.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#FFD100] mb-2">2024</div>
                  <div className="text-sm text-gray-300">Ano da Conquista</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#E10600] mb-2">12º</div>
                  <div className="text-sm text-gray-300">Ranking África</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">1ª</div>
                  <div className="text-sm text-gray-300">Qualificação FIBA</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedStatsSection;
