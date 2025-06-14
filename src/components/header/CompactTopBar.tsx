
import { Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompactTopBar = () => {
  return (
    <div className="bg-cv-blue text-white py-1">
      <div className="cv-container">
        <div className="flex justify-between items-center text-xs">
          <span className="hidden md:block">FIBA: #52 (M) | #78 (F)</span>
          <div className="flex items-center space-x-2">
            <button className="hover:text-cv-yellow p-1" aria-label="Pesquisar">
              <Search size={12} />
            </button>
            <Link to="?lang=pt" className="hover:text-cv-yellow">PT</Link>
            <Link to="?lang=en" className="hover:text-cv-yellow">EN</Link>
            <Link to="/area-reservada" className="flex items-center gap-1 hover:text-cv-yellow">
              <Lock size={12} />
              <span className="hidden sm:inline">Área Reservada</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactTopBar;
