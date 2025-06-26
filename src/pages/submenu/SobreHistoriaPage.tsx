
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SobreHistoriaPage = () => {
  return (
    <PageLayout 
      title="História da FCBB" 
      description="Conheça a trajetória da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-cv-blue">Nossa História</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Fundação</h3>
              <p className="text-gray-700">
                A FCBB foi fundada para promover e desenvolver o basquetebol em Cabo Verde, 
                unindo todas as ilhas numa paixão comum pelo desporto.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Evolução</h3>
              <p className="text-gray-700">
                Desde a sua criação, a federação tem trabalhado no desenvolvimento 
                do basquetebol nacional e na formação de atletas de excelência.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SobreHistoriaPage;
