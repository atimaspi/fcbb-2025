
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cv-blue via-blue-700 to-cv-blue flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-2">Oops!</h1>
        </div>

        {/* Message */}
        <div className="mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
          <p className="text-lg opacity-90 mb-2">
            A página que procura não existe ou foi movida.
          </p>
          <p className="opacity-75">
            Verifique o endereço ou volte à página inicial.
          </p>
        </div>

        {/* Basketball Animation */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-cv-yellow rounded-full relative animate-bounce">
            <div className="absolute inset-2 border-2 border-cv-blue rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-cv-blue"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-cv-blue"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-cv-yellow text-cv-blue hover:bg-cv-yellow/90 font-semibold">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full border-white text-white hover:bg-white hover:text-cv-blue"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Página Anterior
          </Button>
          
          <Link to="/noticias">
            <Button 
              variant="outline"
              className="w-full border-white text-white hover:bg-white hover:text-cv-blue"
            >
              <Search className="h-4 w-4 mr-2" />
              Ver Notícias
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-white/60 text-sm">
          <p>Se continuar a ter problemas, contacte-nos:</p>
          <p className="font-semibold">info@fcbb.cv</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
