
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Users } from 'lucide-react';

const CompeticoesLigaNacionalPage = () => {
  const classificacao = [
    { posicao: 1, equipa: "Clube A", jogos: 10, vitorias: 8, derrotas: 2, pontos: 18 },
    { posicao: 2, equipa: "Clube B", jogos: 10, vitorias: 7, derrotas: 3, pontos: 17 },
    { posicao: 3, equipa: "Clube C", jogos: 10, vitorias: 6, derrotas: 4, pontos: 16 },
    { posicao: 4, equipa: "Clube D", jogos: 10, vitorias: 5, derrotas: 5, pontos: 15 },
  ];

  return (
    <PageLayout 
      title="Liga Nacional - FCBB" 
      description="Informações sobre a Liga Nacional de Basquetebol de Cabo Verde"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cv-blue flex items-center">
                  <Trophy className="w-6 h-6 mr-2" />
                  Classificação Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Pos</th>
                        <th className="text-left p-2">Equipa</th>
                        <th className="text-center p-2">J</th>
                        <th className="text-center p-2">V</th>
                        <th className="text-center p-2">D</th>
                        <th className="text-center p-2">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classificacao.map((equipa) => (
                        <tr key={equipa.posicao} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-semibold">{equipa.posicao}</td>
                          <td className="p-2">{equipa.equipa}</td>
                          <td className="p-2 text-center">{equipa.jogos}</td>
                          <td className="p-2 text-center">{equipa.vitorias}</td>
                          <td className="p-2 text-center">{equipa.derrotas}</td>
                          <td className="p-2 text-center font-semibold">{equipa.pontos}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cv-blue">Resultados da Última Jornada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Clube A vs Clube B</span>
                    <Badge>85-78</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Clube C vs Clube D</span>
                    <Badge>92-89</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-cv-blue flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Próxima Jornada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded">
                  <p className="font-semibold">Clube A vs Clube C</p>
                  <p className="text-sm text-gray-600">Sábado, 19:00</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="font-semibold">Clube B vs Clube D</p>
                  <p className="text-sm text-gray-600">Domingo, 17:00</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-cv-blue flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Melhor Marcador</span>
                  <span className="font-semibold">Jogador X (23.5 pts)</span>
                </div>
                <div className="flex justify-between">
                  <span>Mais Ressaltos</span>
                  <span className="font-semibold">Jogador Y (12.3 reb)</span>
                </div>
                <div className="flex justify-between">
                  <span>Mais Assistências</span>
                  <span className="font-semibold">Jogador Z (8.7 ast)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CompeticoesLigaNacionalPage;
