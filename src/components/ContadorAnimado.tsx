
import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Users, Calendar, MapPin } from 'lucide-react';

const ContadorAnimado = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: Trophy,
      label: "Clubes Federados",
      value: 28,
      suffix: "+",
      color: "text-cv-blue",
      bgColor: "bg-cv-blue/10"
    },
    {
      icon: Users,
      label: "Atletas Registados",
      value: 1350,
      suffix: "+",
      color: "text-cv-red", 
      bgColor: "bg-cv-red/10"
    },
    {
      icon: Calendar,
      label: "Jogos por Temporada",
      value: 240,
      suffix: "+",
      color: "text-cv-blue",
      bgColor: "bg-cv-blue/10"
    },
    {
      icon: MapPin,
      label: "Ilhas Representadas",
      value: 9,
      suffix: "",
      color: "text-cv-red",
      bgColor: "bg-cv-red/10"
    }
  ];

  const AnimatedCounter = ({ targetValue, isVisible, suffix = "" }: { 
    targetValue: number; 
    isVisible: boolean; 
    suffix?: string; 
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = targetValue / steps;
      const stepDuration = duration / steps;

      let currentCount = 0;
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, [targetValue, isVisible]);

    return (
      <span>
        {count.toLocaleString('pt-PT')}{suffix}
      </span>
    );
  };

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-cv-blue via-cv-blue/90 to-cv-red">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            O Basquetebol em Números
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            A força do basquetebol cabo-verdiano em todo o arquipélago
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-full mb-6`}>
                  <stat.icon className={`w-8 h-8 ${stat.color.replace('text-', 'text-')}`} />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                  <AnimatedCounter 
                    targetValue={stat.value} 
                    isVisible={isInView} 
                    suffix={stat.suffix}
                  />
                </div>
                
                <p className="text-lg text-white/90 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Desde 1986, a Federação Cabo-verdiana de Basquetebol tem promovido o desenvolvimento 
            da modalidade em todas as ilhas, formando atletas e organizando competições de excelência.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContadorAnimado;
