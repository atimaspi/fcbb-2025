
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SobreHistoriaPage = () => {
  return (
    <PageLayout 
      title="História da FCBB" 
      description="Conheça a história da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-cv-blue">História da FCBB</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Fundação</h3>
              <p className="text-gray-700">
                A Federação Cabo-verdiana de Basquetebol foi fundada com o objetivo de promover, 
                desenvolver e regulamentar a prática do basquetebol em todo o território nacional.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Marcos Históricos</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Fundação da federação</li>
                <li>Primeira participação internacional</li>
                <li>Criação das competições nacionais</li>
                <li>Desenvolvimento das seleções nacionais</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Evolução</h3>
              <p className="text-gray-700">
                Ao longo dos anos, a FCBB tem trabalhado incansavelmente para elevar o nível 
                do basquetebol cabo-verdiano, tanto a nível nacional quanto internacional.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SobreHistoriaPage;
