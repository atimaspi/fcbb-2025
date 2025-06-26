
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Target } from 'lucide-react';

const EstatisticasPage = () => {
  return (
    <PageLayout 
      title="Estatísticas" 
      description="Estatísticas do basquetebol cabo-verdiano"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Clubes</p>
                  <p className="text-2xl font-bold text-cv-blue">24</p>
                </div>
                <Users className="w-8 h-8 text-cv-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Jogadores</p>
                  <p className="text-2xl font-bold text-cv-blue">480</p>
                </div>
                <Target className="w-8 h-8 text-cv-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Jogos</p>
                  <p className="text-2xl font-bold text-cv-blue">156</p>
                </div>
                <BarChart3 className="w-8 h-8 text-cv-blue" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default EstatisticasPage;
