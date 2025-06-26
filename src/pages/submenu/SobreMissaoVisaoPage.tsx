
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SobreMissaoVisaoPage = () => {
  return (
    <PageLayout 
      title="Missão e Visão - FCBB" 
      description="Missão e visão da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Promover, desenvolver e regulamentar a prática do basquetebol em Cabo Verde, 
                garantindo a formação de atletas de excelência e contribuindo para o 
                desenvolvimento desportivo do país.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Ser uma federação de referência no basquetebol africano, reconhecida pela 
                qualidade das suas competições, pela formação dos seus atletas e pela 
                excelência organizacional.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-cv-blue">Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-cv-red rounded-full"></span>
                <span>Excelência</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-cv-red rounded-full"></span>
                <span>Integridade</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-cv-red rounded-full"></span>
                <span>Transparência</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-cv-red rounded-full"></span>
                <span>Desenvolvimento</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-cv-red rounded-full"></span>
                <span>Fair Play</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-cv-red rounded-full"></span>
                <span>Inclusão</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SobreMissaoVisaoPage;
