
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
import GamesManagement from '@/components/admin/GamesManagement';
import PlayersManagement from '@/components/admin/PlayersManagement';
import { FileText, Calendar, Trophy, Users, Image, Star, Handshake, BarChart3, Sliders, Play } from 'lucide-react';

interface AdminContentProps {
  activeTab: string;
}

const AdminContent = ({ activeTab }: AdminContentProps) => {
  const { user, profile, canManageContent } = useAuth();

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
      case 'games':
        return <GamesManagement />;
      case 'players':
        return <PlayersManagement />;
      case 'clubs':
      case 'competitions':
      case 'federations':
      case 'regionalAssociations':
      case 'coaches':
      case 'referees':
        return <DataManagement />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo à Área Reservada FCBB</CardTitle>
              <CardDescription>
                Sistema completo de gestão de conteúdo da Federação Cabo-verdiana de Basquetebol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-cv-blue/5 rounded-lg">
                    <FileText className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                    <p className="text-sm font-medium">Gestão de Notícias</p>
                    <p className="text-xs text-gray-500">CRUD completo</p>
                  </div>
                  <div className="text-center p-4 bg-cv-red/5 rounded-lg">
                    <Calendar className="w-8 h-8 text-cv-red mx-auto mb-2" />
                    <p className="text-sm font-medium">Eventos</p>
                    <p className="text-xs text-gray-500">Calendário</p>
                  </div>
                  <div className="text-center p-4 bg-cv-yellow/20 rounded-lg">
                    <Users className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                    <p className="text-sm font-medium">Jogadores</p>
                    <p className="text-xs text-gray-500">Atletas</p>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Trophy className="w-8 h-8 text-cv-red mx-auto mb-2" />
                    <p className="text-sm font-medium">Jogos</p>
                    <p className="text-xs text-gray-500">Resultados</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-cv-blue mb-2">Funcionalidades Disponíveis:</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>✅ <strong>CRUD Completo</strong> - Criar, Ler, Atualizar, Eliminar</li>
                    <li>✅ <strong>Gestão de Permissões</strong> - Controle por perfil de utilizador</li>
                    <li>✅ <strong>Upload de Arquivos</strong> - Imagens, PDFs, documentos</li>
                    <li>✅ <strong>Sistema de Status</strong> - Rascunho, Pendente, Publicado</li>
                    <li>✅ <strong>Interface Responsiva</strong> - Funciona em todos os dispositivos</li>
                    <li>✅ <strong>Filtros e Pesquisa</strong> - Encontrar conteúdo rapidamente</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 mb-2">Seu Acesso:</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Utilizador:</strong> {user?.email}</p>
                    <p><strong>Perfil:</strong> {profile?.role || 'Utilizador'}</p>
                    <p><strong>Permissões:</strong> {canManageContent ? 'Gestão de Conteúdo' : 'Apenas Visualização'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {renderContent()}
    </div>
  );
};

export default AdminContent;
