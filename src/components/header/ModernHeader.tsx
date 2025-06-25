
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, Trophy, Calendar, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      id: 'selecoes',
      name: 'Seleções',
      dropdown: [
        { name: 'Seleção Masculina', href: '/selecoes/masculina' },
        { name: 'Seleção Feminina', href: '/selecoes/feminina' },
        { name: 'Seleções Jovens', href: '/selecoes/jovens' },
        { name: 'Convocações', href: '/convocacoes' }
      ]
    },
    {
      id: 'competicoes',
      name: 'Competições',
      dropdown: [
        { name: 'Liga Nacional Masculina', href: '/competicoes/liga-masculina' },
        { name: 'Liga Nacional Feminina', href: '/competicoes/liga-feminina' },
        { name: 'Taça de Cabo Verde', href: '/competicoes/taca' },
        { name: 'Super Taça', href: '/competicoes/super-taca' },
        { name: 'Campeonatos Regionais', href: '/competicoes/regionais' }
      ]
    },
    {
      id: 'noticias',
      name: 'Notícias',
      href: '/noticias'
    },
    {
      id: 'sobre',
      name: 'Sobre',
      dropdown: [
        { name: 'História da FCBB', href: '/sobre/historia' },
        { name: 'Direção', href: '/sobre/direcao' },
        { name: 'Estatutos', href: '/sobre/estatutos' },
        { name: 'Licenciamento', href: '/sobre/licenciamento' }
      ]
    },
    {
      id: 'contactos',
      name: 'Contactos',
      href: '/contactos'
    }
  ];

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
          : 'bg-gradient-to-r from-cv-blue via-cv-blue to-cv-red shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="cv-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cv-blue to-cv-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">CV</span>
            </div>
            <div>
              <h1 className={`font-bold text-xl transition-colors ${
                isScrolled ? 'text-cv-blue' : 'text-white'
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
            <Link
              to="/"
              className={`font-medium hover:scale-105 transition-all duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-cv-red' : 'text-white hover:text-cv-yellow'
              }`}
            >
              Início
            </Link>
            
            {navigationItems.map((item) => (
              <div key={item.id} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className={`flex items-center space-x-1 font-medium hover:scale-105 transition-all duration-200 ${
                      isScrolled ? 'text-gray-700 hover:text-cv-red' : 'text-white hover:text-cv-yellow'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    to={item.href!}
                    className={`font-medium hover:scale-105 transition-all duration-200 ${
                      isScrolled ? 'text-gray-700 hover:text-cv-red' : 'text-white hover:text-cv-yellow'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-cv-blue hover:text-white transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex ${
                isScrolled ? 'text-gray-700 hover:text-cv-red' : 'text-white hover:text-cv-yellow'
              }`}
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`hidden md:flex ${
                isScrolled 
                  ? 'border-cv-red text-cv-red hover:bg-cv-red hover:text-white' 
                  : 'border-white text-white hover:bg-white hover:text-cv-blue'
              }`}
            >
              Área Reservada
            </Button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-3 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5' : 'text-white hover:text-cv-yellow'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 mt-4"
            >
              <div className="py-4 space-y-2">
                <Link
                  to="/"
                  className="block px-4 py-3 text-gray-700 hover:bg-cv-blue hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                {navigationItems.map((item) => (
                  <div key={item.id}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.id)}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-cv-blue hover:text-white transition-colors flex items-center justify-between"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-gray-50"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  to={dropdownItem.href}
                                  className="block px-8 py-2 text-gray-600 hover:bg-cv-blue hover:text-white transition-colors"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href!}
                        className="block px-4 py-3 text-gray-700 hover:bg-cv-blue hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default ModernHeader;
