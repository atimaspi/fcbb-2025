
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, Calendar } from 'lucide-react';

const SelecoesSenitorsPage = () => {
  return (
    <PageLayout 
      title="Seleções Nacionais" 
      description="Seleções nacionais de basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Seleção Masculina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                A seleção nacional masculina representa Cabo Verde 
                nas competições internacionais de basquetebol.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Seleção Feminina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                A seleção nacional feminina tem vindo a crescer 
                e a participar em competições regionais.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Resultados Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded">
                  <span>Cabo Verde vs País A: 75-68</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Próximos Jogos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 border rounded">
                <p className="font-semibold">A definir</p>
                <p className="text-sm text-gray-600">Calendário em atualização</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SelecoesSenitorsPage;
