
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import DataManagement from '@/components/backend/DataManagement';
import UserProfile from '@/components/admin/UserProfile';
import NewsManagement from '@/components/admin/NewsManagement';
import EventsManagement from '@/components/admin/EventsManagement';
import GalleryManagement from '@/components/admin/GalleryManagement';
import HeroSlidesManagement from '@/components/admin/HeroSlidesManagement';
import PartnersManagement from '@/components/admin/PartnersManagement';
import StatisticsManagement from '@/components/admin/StatisticsManagement';
import SiteSettingsManagement from '@/components/admin/SiteSettingsManagement';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { BarChart3, Users, FileText, Calendar, Trophy, Building2, Building, UserCheck, GraduationCap, GamepadIcon, Shield, Image, Star, Handshake, Sliders } from 'lucide-react';

interface AdminContentProps {
  activeTab: string;
}

const AdminContent = ({ activeTab }: AdminContentProps) => {
  const { user, profile, isAdmin } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'profile':
        return <UserProfile />;
      case 'news':
        return <NewsManagement />;
      case 'events':
        return <EventsManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'hero-slides':
        return <HeroSlidesManagement />;
      case 'partners':
        return <PartnersManagement />;
      case 'statistics':
        return <StatisticsManagement />;
      case 'site-settings':
        return <SiteSettingsManagement />;
      case 'clubs':
      case 'competitions':
      case 'federations':
      case 'regionalAssociations':
      case 'players':
      case 'coaches':
      case 'games':
      case 'referees':
        return <DataManagement />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao Painel Administrativo</CardTitle>
              <CardDescription>
                Selecione uma opção no menu lateral para começar a gerir o conteúdo do site FCBB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-cv-blue/5 rounded-lg">
                  <FileText className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                  <p className="text-sm font-medium">Notícias</p>
                </div>
                <div className="text-center p-4 bg-cv-red/5 rounded-lg">
                  <Calendar className="w-8 h-8 text-cv-red mx-auto mb-2" />
                  <p className="text-sm font-medium">Eventos</p>
                </div>
                <div className="text-center p-4 bg-cv-yellow/20 rounded-lg">
                  <Users className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                  <p className="text-sm font-medium">Clubes</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-lg">
                  <Trophy className="w-8 h-8 text-cv-red mx-auto mb-2" />
                  <p className="text-sm font-medium">Competições</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
};

export default AdminContent;
