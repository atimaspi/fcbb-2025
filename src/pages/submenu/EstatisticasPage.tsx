
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

const EstatisticasPage = () => {
  return (
    <PageLayout 
      title="Estatísticas - FCBB" 
      description="Estatísticas do basquetebol cabo-verdiano"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Clubes</p>
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
                  <p className="text-sm text-gray-600">Jogadores Ativos</p>
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
                  <p className="text-sm text-gray-600">Jogos esta Época</p>
                  <p className="text-2xl font-bold text-cv-blue">156</p>
                </div>
                <BarChart3 className="w-8 h-8 text-cv-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Média de Pontos</p>
                  <p className="text-2xl font-bold text-cv-blue">78.5</p>
                </div>
                <TrendingUp className="w-8 h-8 text-cv-blue" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Melhores Marcadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { nome: "Jogador A", clube: "Clube X", pontos: "23.5" },
                  { nome: "Jogador B", clube: "Clube Y", pontos: "21.8" },
                  { nome: "Jogador C", clube: "Clube Z", pontos: "19.4" },
                ].map((jogador, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-semibold">{jogador.nome}</p>
                      <p className="text-sm text-gray-600">{jogador.clube}</p>
                    </div>
                    <span className="font-bold text-cv-blue">{jogador.pontos} pts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Melhores Ressaltadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { nome: "Jogador X", clube: "Clube A", ressaltos: "12.3" },
                  { nome: "Jogador Y", clube: "Clube B", ressaltos: "11.7" },
                  { nome: "Jogador Z", clube: "Clube C", ressaltos: "10.2" },
                ].map((jogador, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-semibold">{jogador.nome}</p>
                      <p className="text-sm text-gray-600">{jogador.clube}</p>
                    </div>
                    <span className="font-bold text-cv-blue">{jogador.ressaltos} reb</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default EstatisticasPage;
