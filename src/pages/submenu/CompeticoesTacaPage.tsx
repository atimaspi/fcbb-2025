
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar } from 'lucide-react';

const CompeticoesTacaPage = () => {
  return (
    <PageLayout 
      title="Taça de Cabo Verde - FCBB" 
      description="Informações sobre a Taça de Cabo Verde de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Formato da Competição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A Taça de Cabo Verde é uma competição eliminatória que reúne 
                as melhores equipas do país numa luta pelo troféu mais prestigiado.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Fases:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Primeira Eliminatória</li>
                  <li>Oitavos de Final</li>
                  <li>Quartos de Final</li>
                  <li>Meias-Finais</li>
                  <li>Final</li>
                </ul>
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
              <div className="space-y-3">
                <div className="p-3 border rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Quartos de Final</span>
                    <Badge variant="outline">15 Jan</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Clube A vs Clube B</p>
                </div>
                <div className="p-3 border rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Quartos de Final</span>
                    <Badge variant="outline">16 Jan</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Clube C vs Clube D</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-cv-blue">Campeões Anteriores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-cv-red" />
                <h4 className="font-semibold">2023</h4>
                <p className="text-sm text-gray-600">Clube Vencedor A</p>
              </div>
              <div className="text-center p-4 border rounded">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <h4 className="font-semibold">2022</h4>
                <p className="text-sm text-gray-600">Clube Vencedor B</p>
              </div>
              <div className="text-center p-4 border rounded">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <h4 className="font-semibold">2021</h4>
                <p className="text-sm text-gray-600">Clube Vencedor C</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CompeticoesTacaPage;
