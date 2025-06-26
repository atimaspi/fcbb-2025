
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
  Building
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const { profile, isAdmin } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Meu Perfil', icon: User },
    { id: 'news', label: 'Notícias', icon: FileText },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'gallery', label: 'Galeria', icon: Image },
    { id: 'hero-slides', label: 'Banner Principal', icon: Star },
    { id: 'statistics', label: 'Estatísticas', icon: BarChart3 },
    { id: 'partners', label: 'Parceiros', icon: Handshake },
    { id: 'site-settings', label: 'Configurações', icon: Sliders },
  ];

  // Add data management items if admin
  if (isAdmin) {
    menuItems.push(
      { id: 'clubs', label: 'Clubes', icon: Building },
      { id: 'competitions', label: 'Competições', icon: Trophy },
      { id: 'players', label: 'Jogadores', icon: Users },
      { id: 'coaches', label: 'Treinadores', icon: Shield }
    );
  }

  return (
    <Card className="w-64 h-fit sticky top-6">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="mb-4">
            <h3 className="font-semibold text-cv-blue mb-2">Menu Principal</h3>
            <div className="text-xs text-gray-600 mb-4">
              Logado como: {profile?.role || 'Utilizador'}
            </div>
          </div>
          
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
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
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;
