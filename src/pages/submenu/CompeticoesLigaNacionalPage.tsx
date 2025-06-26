
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar } from 'lucide-react';

const CompeticoesLigaNacionalPage = () => {
  const classificacao = [
    { pos: 1, equipa: "Clube A", jogos: 10, vitorias: 8, pontos: 18 },
    { pos: 2, equipa: "Clube B", jogos: 10, vitorias: 7, pontos: 17 },
    { pos: 3, equipa: "Clube C", jogos: 10, vitorias: 6, pontos: 16 },
  ];

  return (
    <PageLayout 
      title="Liga Nacional" 
      description="Campeonato Nacional de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Classificação
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
                      <th className="text-center p-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classificacao.map((equipa) => (
                      <tr key={equipa.pos} className="border-b">
                        <td className="p-2 font-semibold">{equipa.pos}</td>
                        <td className="p-2">{equipa.equipa}</td>
                        <td className="p-2 text-center">{equipa.jogos}</td>
                        <td className="p-2 text-center">{equipa.vitorias}</td>
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
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Próxima Jornada
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

export default CompeticoesLigaNacionalPage;
