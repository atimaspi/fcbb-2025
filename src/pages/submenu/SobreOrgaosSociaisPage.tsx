
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SobreOrgaosSociaisPage = () => {
  const orgaos = [
    { nome: "Assembleia Geral", descricao: "Órgão máximo da federação" },
    { nome: "Direção", descricao: "Órgão executivo da federação" },
    { nome: "Conselho Fiscal", descricao: "Órgão de fiscalização" },
    { nome: "Conselho de Disciplina", descricao: "Órgão disciplinar" },
  ];

  return (
    <PageLayout 
      title="Órgãos Sociais" 
      description="Estrutura organizacional da FCBB"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {orgaos.map((orgao, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl text-cv-blue">{orgao.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{orgao.descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default SobreOrgaosSociaisPage;
