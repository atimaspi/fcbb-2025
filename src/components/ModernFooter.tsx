
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Links Rápidos",
      links: [
        { name: "História da FCBB", href: "/sobre/historia" },
        { name: "Direção", href: "/sobre/direcao" },
        { name: "Estatutos", href: "/sobre/estatutos" },
        { name: "Licenciamento", href: "/sobre/licenciamento" },
        { name: "Área Reservada", href: "/auth" }
      ]
    },
    {
      title: "Competições",
      links: [
        { name: "Liga Nacional Masculina", href: "/competicoes/liga-masculina" },
        { name: "Liga Nacional Feminina", href: "/competicoes/liga-feminina" },
        { name: "Taça de Cabo Verde", href: "/competicoes/taca" },
        { name: "Super Taça", href: "/competicoes/super-taca" },
        { name: "Campeonatos Regionais", href: "/competicoes/regionais" },
        { name: "Seleção Nacional", href: "/selecoes/masculina" }
      ]
    },
    {
      title: "Contactos",
      isContact: true,
      content: {
        address: "Av. Cidade de Lisboa, CP 540\nPraia, Ilha de Santiago\nCabo Verde",
        phone: "(+238) 261 22 34",
        email: "geral@fcbb.cv",
        partners: "Parceiros Internacionais"
      }
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  const stats = [
    { value: "24+", label: "Clubes" },
    { value: "1250+", label: "Atletas" },
    { value: "180+", label: "Jogos/Ano" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-cv-blue to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="cv-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* FCBB Logo and Description */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cv-blue to-cv-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">CV</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">FCBB</h3>
                <p className="text-sm text-gray-300">Est. 1986</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              A Federação Cabo-verdiana de Basquetebol é o órgão máximo que rege o basquetebol em Cabo Verde, 
              promovendo o desenvolvimento da modalidade em todas as ilhas do arquipélago.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cv-red transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-cv-yellow flex items-center">
                {section.title}
              </h4>
              
              {section.isContact ? (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1 text-cv-yellow flex-shrink-0" />
                    <div className="text-gray-300 text-sm">
                      {section.content.address.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-cv-yellow" />
                    <span className="text-gray-300 text-sm">{section.content.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cv-yellow" />
                    <span className="text-gray-300 text-sm">{section.content.email}</span>
                  </div>

                  <div className="mt-8">
                    <h5 className="text-sm font-semibold mb-4 text-cv-yellow">
                      {section.content.partners}
                    </h5>
                    <div className="flex space-x-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <img src="/lovable-uploads/bf192f8a-00f0-4dca-b88b-fa60a16fb8a6.png" alt="FIBA" className="w-8 h-8 object-contain" />
                      </div>
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-800">FIBA</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-cv-yellow transition-colors duration-300 text-sm hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t border-white/10 py-8">
        <div className="cv-container">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-cv-yellow mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="cv-container">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Federação Cabo-verdiana de Basquetebol. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacidade" className="text-gray-400 hover:text-cv-yellow transition-colors">
                Privacidade
              </Link>
              <Link to="/termos" className="text-gray-400 hover:text-cv-yellow transition-colors">
                Termos
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-cv-yellow transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
