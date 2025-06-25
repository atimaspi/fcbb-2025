
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Globe, Trophy, Users } from 'lucide-react';

const MissionVisionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#002D72] mb-6 font-display">
            A Nossa Identidade
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Construindo o futuro do basquetebol cabo-verdiano com visão, determinação e orgulho nacional
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Missão */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-[#E10600] hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#E10600] to-[#FFD100] p-4 rounded-2xl mr-6 shadow-lg">
                  <Target className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#002D72] font-display">Nossa Missão</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Desenvolver, promover e organizar o basquetebol em todo o arquipélago cabo-verdiano, 
                criando oportunidades para atletas de todas as idades e níveis, desde as comunidades 
                locais até à representação internacional.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-[#E10600] mr-2" />
                  <span className="text-sm font-medium">Paixão pelo Desporto</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-[#E10600] mr-2" />
                  <span className="text-sm font-medium">Inclusão Social</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visão */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-[#002D72] hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#002D72] to-[#FFD100] p-4 rounded-2xl mr-6 shadow-lg">
                  <Eye className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#002D72] font-display">Nossa Visão</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Ser a federação de referência em África no desenvolvimento do basquetebol, 
                com presença forte nos torneios FIBA e reconhecimento internacional pela 
                qualidade dos nossos atletas e organização exemplar.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-[#002D72] mr-2" />
                  <span className="text-sm font-medium">Alcance Global</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-[#002D72] mr-2" />
                  <span className="text-sm font-medium">Excelência FIBA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-[#002D72] via-[#E10600] to-[#FFD100] rounded-3xl p-1 shadow-2xl">
            <div className="bg-white rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold text-[#002D72] mb-8 font-display">Nossos Valores</h3>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { title: "Excelência", desc: "Busca constante pela melhoria e qualidade" },
                  { title: "Integridade", desc: "Transparência e ética em todas as ações" },
                  { title: "Unidade", desc: "Fortalecendo laços entre todas as ilhas" },
                  { title: "Inovação", desc: "Modernização e desenvolvimento contínuo" }
                ].map((valor, index) => (
                  <motion.div
                    key={valor.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <h4 className="text-xl font-bold text-[#002D72] mb-2">{valor.title}</h4>
                    <p className="text-gray-600 text-sm">{valor.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
