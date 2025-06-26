
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar } from 'lucide-react';

const CompeticoesTacaPage = () => {
  return (
    <PageLayout 
      title="Taça de Cabo Verde" 
      description="Competição eliminatória nacional"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Formato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Competição eliminatória que reúne as melhores equipas do país.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Eliminatórias</li>
                <li>Quartos de Final</li>
                <li>Meias-Finais</li>
                <li>Final</li>
              </ul>
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
                  <p className="font-semibold">Quartos de Final</p>
                  <p className="text-sm text-gray-600">A definir</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default CompeticoesTacaPage;
