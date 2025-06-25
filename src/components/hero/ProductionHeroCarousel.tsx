
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
    title: "FCBB - Federação Cabo-verdiana de Basquetebol",
    subtitle: "Excelência Desportiva Nacional",
    description: "Promovendo o desenvolvimento do basquetebol em todas as ilhas de Cabo Verde com paixão e dedicação",
    ctaText: "Descobrir Mais",
    ctaLink: "/sobre"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1920&h=1080&fit=crop",
    webpImage: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1920&h=1080&fit=crop&fm=webp",
    title: "Seleções Nacionais",
    subtitle: "Orgulho Cabo-verdiano",
    description: "Representando Cabo Verde nas competições internacionais com determinação, talento e espírito competitivo",
    ctaText: "Ver Seleções",
    ctaLink: "/selecoes"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&h=1080&fit=crop",
    webpImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&h=1080&fit=crop&fm=webp",
    title: "Liga Nacional 2024",
    subtitle: "Competições Nacionais",
    description: "Acompanhe as melhores equipas de Cabo Verde na temporada mais emocionante do basquetebol nacional",
    ctaText: "Ver Calendário",
    ctaLink: "/competicoes"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1920&h=1080&fit=crop",
    webpImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1920&h=1080&fit=crop&fm=webp",
    title: "Futuro do Basquetebol",
    subtitle: "Desenvolvimento Jovem",
    description: "Investindo na formação dos jovens talentos cabo-verdianos para construir o futuro do nosso desporto",
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

  // Auto-play with 7-second intervals
  useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalRef.current = setInterval(nextSlide, 7000);
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
      className="relative h-screen overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#1A1F2E] to-[#0B132B]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="banner"
      aria-label="Carousel de banner principal da FCBB"
    >
      {/* Background Cabo Verde Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Cabo Verde Flag Stripes */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cv-yellow via-cv-red to-cv-blue"></div>
        
        {/* 10 Stars Pattern */}
        <div className="absolute top-8 right-8">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-cv-yellow"
              style={{
                left: `${(i % 5) * 20}px`,
                top: `${Math.floor(i / 5) * 15}px`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Basketball Court SVG */}
        <svg className="w-full h-full opacity-20" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="400" x2="1200" y2="400" stroke="white" strokeWidth="3" strokeDasharray="10,5"/>
          <circle cx="600" cy="400" r="120" fill="none" stroke="white" strokeWidth="3"/>
          <circle cx="200" cy="400" r="90" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="1000" cy="400" r="90" fill="none" stroke="white" strokeWidth="2"/>
          <rect x="0" y="300" width="150" height="200" fill="none" stroke="white" strokeWidth="2"/>
          <rect x="1050" y="300" width="150" height="200" fill="none" stroke="white" strokeWidth="2"/>
        </svg>

        {/* Wave Pattern */}
        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1200 100" preserveAspectRarity="none">
          <path d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(247, 209, 22, 0.1)"/>
          <path d="M0,70 Q400,40 800,70 T1200,70 L1200,100 L0,100 Z" fill="rgba(207, 32, 39, 0.1)"/>
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <motion.div
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 h-full flex items-center"
            >
              <div className="cv-container">
                <div className="max-w-4xl text-white">
                  <motion.span 
                    className="inline-block px-6 py-3 bg-gradient-to-r from-cv-red to-cv-yellow text-black font-bold rounded-full mb-8 text-lg shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.span>
                  
                  <motion.h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight font-display"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-200 leading-relaxed max-w-3xl"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row gap-6"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    <motion.div
                      animate={{
                        background: [
                          "linear-gradient(45deg, #003893, #CF2027)",
                          "linear-gradient(45deg, #CF2027, #F7D116)",
                          "linear-gradient(45deg, #F7D116, #003893)",
                          "linear-gradient(45deg, #003893, #CF2027)"
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
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-xl px-10 py-6 rounded-2xl shadow-2xl transition-all duration-300 w-full sm:w-auto"
                        asChild
                      >
                        <a href={heroSlides[currentSlide].ctaLink}>
                          {heroSlides[currentSlide].ctaText}
                          <ArrowRight className="ml-3 h-6 w-6" />
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
                        className="border-3 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-xl px-10 py-6 rounded-2xl transition-all duration-300 w-full sm:w-auto"
                      >
                        <Play className="mr-3 h-6 w-6" />
                        Ver Vídeo
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
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-cv-yellow"
        aria-label="Slide anterior"
        tabIndex={0}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-cv-yellow"
        aria-label="Próximo slide"
        tabIndex={0}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-cv-yellow rounded-full ${
              index === currentSlide 
                ? 'w-16 h-5 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow rounded-full shadow-lg' 
                : 'w-5 h-5 bg-white/60 rounded-full hover:bg-white/80 hover:scale-110'
            }`}
            aria-label={`Ir para slide ${index + 1}: ${heroSlides[index].title}`}
            tabIndex={0}
          />
        ))}
      </div>

      {/* Play/Pause Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-cv-yellow"
        aria-label={isPlaying ? "Pausar slideshow automático" : "Reproduzir slideshow automático"}
        tabIndex={0}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 7,
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
