import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const FibaStyleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session ? session.user : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const mainNavItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Seleções', href: '#selecoes' },
    { name: 'Competições', href: '#competicoes' },
    { name: 'Notícias', href: '#noticias' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contactos', href: '#contactos' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="cv-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#002D72] to-[#E10600] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">CV</span>
            </div>
            <div>
              <h1 className={`font-bold text-xl transition-colors ${
                isScrolled ? 'text-[#002D72]' : 'text-white'
              }`}>
                FCBB
              </h1>
              <p className={`text-sm transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-gray-200'
              }`}>
                Federação Cabo-verdiana de Basquetebol
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`font-medium hover:scale-105 transition-all duration-200 ${
                  isScrolled ? 'text-gray-700 hover:text-[#E10600]' : 'text-white hover:text-[#FFD100]'
                }`}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex ${
                isScrolled ? 'text-gray-700 hover:text-[#E10600]' : 'text-white hover:text-[#FFD100]'
              }`}
            >
              <Search className="h-4 w-4" />
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className={`hidden md:flex ${
                    isScrolled ? 'text-gray-700 hover:text-[#E10600]' : 'text-white hover:text-[#FFD100]'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-[#002D72] to-[#E10600] flex items-center justify-center ${
                  isScrolled ? '' : 'ring-2 ring-white/30'
                }`}>
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                size="sm"
                className="bg-gradient-to-r from-[#E10600] to-[#FFD100] text-white hover:opacity-90 font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="cv-container py-4">
              <nav className="flex flex-col space-y-4">
                {mainNavItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-[#E10600] font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                {!user && (
                  <Button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-[#E10600] to-[#FFD100] text-white hover:opacity-90 w-fit"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                )}

                {user && (
                  <Button
                    onClick={() => {
                      navigate('/admin');
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-fit"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Painel Admin
                  </Button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default FibaStyleHeader;
