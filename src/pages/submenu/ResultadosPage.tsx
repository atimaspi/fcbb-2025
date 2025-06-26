
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';

const ResultadosPage = () => {
  const resultados = [
    { data: "14 Jan 2024", casa: "Clube A", fora: "Clube B", resultado: "85-78", competicao: "Liga Nacional" },
    { data: "13 Jan 2024", casa: "Clube C", fora: "Clube D", resultado: "92-89", competicao: "Liga Nacional" },
    { data: "12 Jan 2024", casa: "Clube E", fora: "Clube F", resultado: "76-82", competicao: "Taça CV" },
  ];

  const proximosJogos = [
    { data: "20 Jan 2024", hora: "19:00", casa: "Clube A", fora: "Clube C", competicao: "Liga Nacional" },
    { data: "21 Jan 2024", hora: "17:00", casa: "Clube B", fora: "Clube D", competicao: "Liga Nacional" },
  ];

  return (
    <PageLayout 
      title="Resultados - FCBB" 
      description="Resultados e calendário dos jogos de basquetebol de Cabo Verde"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                Resultados Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resultados.map((jogo, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{jogo.data}</span>
                      <Badge variant="outline">{jogo.competicao}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{jogo.casa} vs {jogo.fora}</span>
                      <span className="font-bold text-cv-blue">{jogo.resultado}</span>
                    </div>
                  </div>
                ))}
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
              <div className="space-y-4">
                {proximosJogos.map((jogo, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{jogo.data} - {jogo.hora}</span>
                      <Badge variant="outline">{jogo.competicao}</Badge>
                    </div>
                    <div className="font-medium">
                      {jogo.casa} vs {jogo.fora}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-cv-blue">Classificações</CardTitle>
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
                  <tr className="border-b">
                    <td className="p-2 font-semibold">1</td>
                    <td className="p-2">Clube A</td>
                    <td className="p-2 text-center">10</td>
                    <td className="p-2 text-center">8</td>
                    <td className="p-2 text-center">2</td>
                    <td className="p-2 text-center font-semibold">18</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">2</td>
                    <td className="p-2">Clube B</td>
                    <td className="p-2 text-center">10</td>
                    <td className="p-2 text-center">7</td>
                    <td className="p-2 text-center">3</td>
                    <td className="p-2 text-center font-semibold">17</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ResultadosPage;
