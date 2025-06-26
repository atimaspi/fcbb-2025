
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SobreOrgaosSociaisPage = () => {
  return (
    <PageLayout 
      title="Órgãos Sociais - FCBB" 
      description="Estrutura organizacional da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Assembleia Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Órgão máximo da federação, responsável pelas decisões estratégicas 
                e pela eleição dos órgãos dirigentes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Direção</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Órgão executivo responsável pela gestão corrente da federação 
                e implementação das decisões da Assembleia Geral.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Conselho Fiscal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Órgão de fiscalização responsável pelo controlo da gestão financeira 
                e administrativa da federação.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-cv-blue">Conselho de Disciplina</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Órgão responsável pela aplicação de medidas disciplinares e 
                resolução de conflitos no âmbito das competições.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SobreOrgaosSociaisPage;
