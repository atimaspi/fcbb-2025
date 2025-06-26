
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Calendar } from 'lucide-react';

const SelecoesSenitorsPage = () => {
  const selecionados = [
    { nome: "Jogador 1", posicao: "Base", idade: "25", clube: "Clube A" },
    { nome: "Jogador 2", posicao: "Extremo", idade: "23", clube: "Clube B" },
    { nome: "Jogador 3", posicao: "Poste", idade: "27", clube: "Clube C" },
    { nome: "Jogador 4", posicao: "Ala", idade: "24", clube: "Clube D" },
  ];

  return (
    <PageLayout 
      title="Seleções Nacionais - FCBB" 
      description="Informações sobre as seleções nacionais de basquetebol de Cabo Verde"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cv-blue flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  Plantel Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {selecionados.map((jogador, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{jogador.nome}</h4>
                        <p className="text-sm text-gray-600">{jogador.clube}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">{jogador.posicao}</Badge>
                        <p className="text-sm text-gray-600">{jogador.idade} anos</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Cabo Verde vs País A</span>
                    <Badge>75-68</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>País B vs Cabo Verde</span>
                    <Badge variant="destructive">82-79</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Cabo Verde vs País C</span>
                    <Badge>91-85</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-cv-blue">Equipa Técnica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold">Treinador Principal</h4>
                  <p className="text-sm text-gray-600">Nome do Treinador</p>
                </div>
                <div>
                  <h4 className="font-semibold">Assistente Técnico</h4>
                  <p className="text-sm text-gray-600">Nome do Assistente</p>
                </div>
                <div>
                  <h4 className="font-semibold">Preparador Físico</h4>
                  <p className="text-sm text-gray-600">Nome do Preparador</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-cv-blue flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Próximos Jogos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded">
                  <p className="font-semibold">vs País D</p>
                  <p className="text-sm text-gray-600">15 de Janeiro, 2024</p>
                  <p className="text-sm text-gray-600">Ginásio Nacional</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="font-semibold">vs País E</p>
                  <p className="text-sm text-gray-600">22 de Janeiro, 2024</p>
                  <p className="text-sm text-gray-600">Fora</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SelecoesSenitorsPage;
