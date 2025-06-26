
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';

const ResultadosPage = () => {
  const resultados = [
    { data: "14 Jan 2024", casa: "Clube A", fora: "Clube B", resultado: "85-78" },
    { data: "13 Jan 2024", casa: "Clube C", fora: "Clube D", resultado: "92-89" },
  ];

  return (
    <PageLayout 
      title="Resultados" 
      description="Resultados e calendário dos jogos"
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
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{jogo.casa} vs {jogo.fora}</span>
                      <Badge>{jogo.resultado}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{jogo.data}</p>
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
              <div className="p-4 border rounded-lg">
                <p className="font-medium">A definir</p>
                <p className="text-sm text-gray-600">Calendário em atualização</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResultadosPage;
