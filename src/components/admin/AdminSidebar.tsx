
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Calendar, 
  Image, 
  Sliders, 
  Star,
  Handshake,
  Shield,
  User,
  Home,
  Trophy,
  Building,
  Play,
  UserCheck,
  Settings
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const { profile, isAdmin, canManageContent } = useAuth();

  const menuSections = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, access: 'all' },
        { id: 'profile', label: 'Meu Perfil', icon: User, access: 'all' },
      ]
    },
    {
      title: 'Gestão de Conteúdo',
      items: [
        { id: 'news', label: 'Notícias', icon: FileText, access: 'content' },
        { id: 'events', label: 'Eventos', icon: Calendar, access: 'content' },
        { id: 'gallery', label: 'Galeria', icon: Image, access: 'content' },
        { id: 'hero-slides', label: 'Banner Principal', icon: Star, access: 'content' },
      ]
    },
    {
      title: 'Gestão Desportiva',
      items: [
        { id: 'games', label: 'Jogos', icon: Play, access: 'content' },
        { id: 'players', label: 'Jogadores', icon: UserCheck, access: 'content' },
        { id: 'clubs', label: 'Clubes', icon: Building, access: 'admin' },
        { id: 'competitions', label: 'Competições', icon: Trophy, access: 'admin' },
        { id: 'coaches', label: 'Treinadores', icon: Users, access: 'admin' },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { id: 'statistics', label: 'Estatísticas', icon: BarChart3, access: 'content' },
        { id: 'partners', label: 'Parceiros', icon: Handshake, access: 'content' },
        { id: 'site-settings', label: 'Configurações', icon: Sliders, access: 'admin' },
      ]
    }
  ];

  const hasAccess = (access: string) => {
    switch (access) {
      case 'all':
        return true;
      case 'content':
        return canManageContent;
      case 'admin':
        return isAdmin;
      default:
        return false;
    }
  };

  return (
    <Card className="w-64 h-fit sticky top-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="font-semibold text-cv-blue mb-2">Área Reservada FCBB</h3>
            <div className="text-xs text-gray-600 mb-2">
              <div><strong>Utilizador:</strong> {profile?.full_name || 'N/A'}</div>
              <div><strong>Perfil:</strong> {profile?.role || 'Utilizador'}</div>
            </div>
            <div className="flex space-x-1">
              {isAdmin && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Admin</span>
              )}
              {canManageContent && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Editor</span>
              )}
            </div>
          </div>
          
          {menuSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items
                  .filter(item => hasAccess(item.access))
                  .map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "default" : "ghost"}
                        className={`w-full justify-start text-sm ${
                          activeTab === item.id 
                            ? 'bg-cv-blue text-white' 
                            : 'text-gray-700 hover:bg-cv-blue/5'
                        }`}
                        onClick={() => onTabChange(item.id)}
                      >
                        <IconComponent className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    );
                  })}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="font-medium">Funcionalidades:</div>
              <div>• CRUD Completo</div>
              <div>• Upload de Arquivos</div>
              <div>• Sistema de Permissões</div>
              <div>• Publicação/Rascunho</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;
