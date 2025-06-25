
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSlide {
  id: number;
  image: string;
  webpImage?: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&h=1080&fit=crop",
    webpImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&h=1080&fit=crop&fm=webp",
    title: "Orgulho Nacional. Talento Global.",
    subtitle: "FCBB - Unidos pelo Basquetebol",
    description: "Do bairro para o mundo. Desenvolvendo o basquetebol cabo-verdiano com paixão, dedicação e visão internacional",
    ctaText: "Ver Competições",
    ctaLink: "/competicoes"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1920&h=1080&fit=crop",
    webpImage: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1920&h=1080&fit=crop&fm=webp",
    title: "Seleções Nacionais",
    subtitle: "Representando Cabo Verde com Orgulho",
    description: "Os nossos atletas levam o nome de Cabo Verde aos palcos internacionais, competindo com determinação e espírito cabo-verdiano",
    ctaText: "Ver Seleções",
    ctaLink: "/selecoes"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&h=1080&fit=crop",
    webpImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&h=1080&fit=crop&fm=webp",
    title: "Futuro do Basquetebol Africano",
    subtitle: "Inovação e Desenvolvimento",
    description: "Construindo o futuro do basquetebol em África através da formação, infraestruturas e parcerias estratégicas com a FIBA",
    ctaText: "Seja Nosso Parceiro",
    ctaLink: "#parceiros"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1920&h=1080&fit=crop",
    webpImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1920&h=1080&fit=crop&fm=webp",
    title: "Do Bairro para o Mundo",
    subtitle: "Desenvolvimento Jovem",
    description: "Identificando e desenvolvendo talentos em todas as ilhas de Cabo Verde, criando oportunidades para os nossos jovens atletas",
    ctaText: "Programas Jovens",
    ctaLink: "/formacao"
  }
];

const ProductionHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Auto-play with 8-second intervals as requested
  useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalRef.current = setInterval(nextSlide, 8000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(heroSlides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, nextSlide, prevSlide, goToSlide]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % heroSlides.length;
    const img = new Image();
    const nextSlideData = heroSlides[nextIndex];
    
    // Try WebP first, fallback to regular image
    img.src = nextSlideData.webpImage || nextSlideData.image;
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    })
  };

  const contentVariants = {
    enter: {
      y: 60,
      opacity: 0,
      scale: 0.9
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      y: -30,
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section 
      className="relative h-screen overflow-hidden bg-gradient-to-br from-[#002D72] via-[#1A1F2E] to-[#002D72]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="banner"
      aria-label="Carousel de banner principal da FCBB"
    >
      {/* Enhanced Cabo Verde Background Elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        {/* Cabo Verde Flag Colors */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#002D72] via-[#E10600] to-[#FFD100]"></div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-[#FFD100] via-[#E10600] to-[#002D72]"></div>
        
        {/* 10 Stars Pattern representing CV flag */}
        <div className="absolute top-8 right-8">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-[#FFD100]"
              style={{
                left: `${(i % 5) * 25}px`,
                top: `${Math.floor(i / 5) * 20}px`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Enhanced Basketball Court SVG */}
        <svg className="w-full h-full opacity-25" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="400" x2="1200" y2="400" stroke="#FFD100" strokeWidth="4" strokeDasharray="15,8"/>
          <circle cx="600" cy="400" r="140" fill="none" stroke="#FFD100" strokeWidth="4"/>
          <circle cx="200" cy="400" r="100" fill="none" stroke="#E10600" strokeWidth="3"/>
          <circle cx="1000" cy="400" r="100" fill="none" stroke="#E10600" strokeWidth="3"/>
          <rect x="0" y="280" width="180" height="240" fill="none" stroke="#002D72" strokeWidth="3"/>
          <rect x="1020" y="280" width="180" height="240" fill="none" stroke="#002D72" strokeWidth="3"/>
          <rect x="0" y="350" width="60" height="100" fill="none" stroke="#FFD100" strokeWidth="2"/>
          <rect x="1140" y="350" width="60" height="100" fill="none" stroke="#FFD100" strokeWidth="2"/>
        </svg>

        {/* Cabo Verde Wave Pattern */}
        <svg className="absolute bottom-0 w-full h-40" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q300,40 600,100 T1200,100 L1200,200 L0,200 Z" fill="rgba(255, 209, 0, 0.1)"/>
          <path d="M0,130 Q400,70 800,130 T1200,130 L1200,200 L0,200 Z" fill="rgba(225, 6, 0, 0.1)"/>
          <path d="M0,160 Q500,110 1000,160 T1200,160 L1200,200 L0,200 Z" fill="rgba(0, 45, 114, 0.1)"/>
        </svg>
      </div>

      {/* Slide Container */}
      <div className="relative h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 }
            }}
            className="absolute inset-0"
          >
            {/* Background Image with WebP Support */}
            <div className="absolute inset-0">
              <picture>
                <source 
                  srcSet={heroSlides[currentSlide].webpImage} 
                  type="image/webp"
                />
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                  loading={currentSlide === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
            </div>

            {/* Enhanced Content */}
            <motion.div
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 h-full flex items-center"
            >
              <div className="cv-container">
                <div className="max-w-5xl text-white">
                  <motion.span 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#E10600] to-[#FFD100] text-black font-bold rounded-full mb-10 text-xl shadow-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.span>
                  
                  <motion.h1 
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight font-display"
                    style={{
                      textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                      background: 'linear-gradient(135deg, #FFD100 0%, #FFFFFF 50%, #002D72 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-2xl md:text-3xl lg:text-4xl mb-12 text-gray-100 leading-relaxed max-w-4xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row gap-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    <motion.div
                      animate={{
                        background: [
                          "linear-gradient(45deg, #002D72, #E10600)",
                          "linear-gradient(45deg, #E10600, #FFD100)",
                          "linear-gradient(45deg, #FFD100, #002D72)",
                          "linear-gradient(45deg, #002D72, #E10600)"
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="rounded-2xl p-1"
                    >
                      <Button 
                        size="lg" 
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-2xl px-12 py-8 rounded-2xl shadow-2xl transition-all duration-300 w-full sm:w-auto"
                        asChild
                      >
                        <a href={heroSlides[currentSlide].ctaLink}>
                          {heroSlides[currentSlide].ctaText}
                          <ArrowRight className="ml-4 h-7 w-7" />
                        </a>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-4 border-white/50 text-white hover:bg-white/15 backdrop-blur-sm font-bold text-2xl px-12 py-8 rounded-2xl transition-all duration-300 w-full sm:w-auto"
                      >
                        <Play className="mr-4 h-7 w-7" />
                        Ver Vídeo Institucional
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-md hover:bg-black/90 text-white p-5 rounded-full transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-[#FFD100]"
        aria-label="Slide anterior"
        tabIndex={0}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-md hover:bg-black/90 text-white p-5 rounded-full transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-[#FFD100]"
        aria-label="Próximo slide"
        tabIndex={0}
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#FFD100] rounded-full ${
              index === currentSlide 
                ? 'w-20 h-6 bg-gradient-to-r from-[#002D72] via-[#E10600] to-[#FFD100] rounded-full shadow-2xl' 
                : 'w-6 h-6 bg-white/70 rounded-full hover:bg-white/90 hover:scale-125'
            }`}
            aria-label={`Ir para slide ${index + 1}: ${heroSlides[index].title}`}
            tabIndex={0}
          />
        ))}
      </div>

      {/* Play/Pause Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-12 right-12 bg-black/70 backdrop-blur-md hover:bg-black/90 text-white p-5 rounded-full transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-[#FFD100]"
        aria-label={isPlaying ? "Pausar slideshow automático" : "Reproduzir slideshow automático"}
        tabIndex={0}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </button>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black/30 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#002D72] via-[#E10600] to-[#FFD100]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 8,
            ease: "linear",
            repeat: Infinity
          }}
          key={currentSlide}
        />
      </div>
    </section>
  );
};

export default ProductionHeroCarousel;
