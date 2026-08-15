// src/app/page.tsx
import { getSingleType, getCollectionData } from "@/lib/cms";
import Aurora from "@/components/Aurora";

export default function Home() {
  // Lendo os dados do CMS
  const homeData = getSingleType("home") || {};
  const sobreData = getSingleType("sobre") || {};
  const projetos = getCollectionData("projetos");
  const experiencias = getCollectionData("experiencias");
  const formacoes = getCollectionData("formacao");
  const skills = getCollectionData("skills");
  const certificacoes = getCollectionData("certificacoes");
  const idiomas = getCollectionData("idiomas");
  const atuacoes = getCollectionData("atuacoes");

  return (
    <main className="relative min-h-screen bg-[#0B0F19] text-white selection:bg-indigo-500 selection:text-white font-sans overflow-hidden">
      {/* Background Aurora */}
      <div className="fixed inset-0 opacity-40 z-0">
        <Aurora
          colorStops={["#3D7EAA", "#7DC2A7", "#1E1B4B"]}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-32">
        {/* ================= HEADER & HERO ================= */}
        <section className="space-y-12">
          <header className="flex justify-between items-center border-b border-white/10 pb-6 backdrop-blur-sm">
            <h1 className="text-xl font-bold tracking-wider text-indigo-400">
              // Dev.Antigravity
            </h1>
            <div className="flex gap-4 items-center">
              {homeData.email && (
                <a
                  href={`mailto:${homeData.email}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contato
                </a>
              )}
              {homeData.cv && (
                <a
                  href={homeData.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all"
                >
                  CV
                </a>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                {homeData.cargo || "Inovação Técnica & Produto."}
              </h2>
              {homeData.resumo && (
                <div
                  className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed backdrop-blur-xs prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: homeData.resumo }}
                />
              )}

              {/* Links Sociais */}
              {homeData.social_links && homeData.social_links.length > 0 && (
                <div className="flex gap-4 pt-4">
                  {homeData.social_links.map((social: any, idx: number) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-indigo-100 transition-colors"
                    >
                      {social.nome}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {homeData.foto && (
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                  <img
                    src={homeData.foto}
                    alt={homeData.alt_foto || "Foto de perfil"}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= SOBRE MIM ================= */}
        {sobreData.description && (
          <section className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
            <h3 className="text-2xl font-bold text-indigo-300 mb-6">
              // Sobre Mim
            </h3>
            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sobreData.description }}
            />
          </section>
        )}

        {/* ================= EXPERIÊNCIA PROFISSIONAL ================= */}
        {experiencias.length > 0 && (
          <section className="space-y-8">
            <h3 className="text-3xl font-bold tracking-tight text-white/90">
              // Trajetória Profissional
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {experiencias.map((exp: any, idx: number) => (
                <div
                  key={idx}
                  className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h4 className="text-2xl font-semibold text-white">
                        {exp.cargo}
                      </h4>
                      <p className="text-indigo-400 text-lg font-medium">
                        {exp.empresa}
                      </p>
                    </div>
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 whitespace-nowrap">
                      {exp.start_date &&
                        new Date(exp.start_date).toLocaleDateString("pt-BR", {
                          month: "short",
                          year: "numeric",
                        })}
                      {" - "}
                      {exp.is_current
                        ? "Presente"
                        : exp.end_date &&
                          new Date(exp.end_date).toLocaleDateString("pt-BR", {
                            month: "short",
                            year: "numeric",
                          })}
                    </div>
                  </div>
                  {exp.description && (
                    <div
                      className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= PROJETOS ================= */}
        {projetos.length > 0 && (
          <section className="space-y-8">
            <h3 className="text-3xl font-bold tracking-tight text-white/90">
              // Projetos em Destaque
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projetos.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-lg overflow-hidden group hover:border-indigo-500/50 transition-colors duration-300"
                >
                  {proj.cover && (
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={proj.cover}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="text-2xl font-semibold mb-1">
                      {proj.title}
                    </h4>
                    <p className="text-indigo-300 text-sm mb-4">
                      {proj.subtitle}
                    </p>

                    {proj.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.tags.split(",").map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div
                      className="text-gray-400 text-sm flex-1 prose prose-invert"
                      dangerouslySetInnerHTML={{ __html: proj.description }}
                    />

                    <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
                      {proj.repo_link && (
                        <a
                          href={proj.repo_link}
                          target="_blank"
                          className="text-sm font-medium hover:text-indigo-300 transition-colors"
                        >
                          Repositório &rarr;
                        </a>
                      )}
                      {proj.prod_link && (
                        <a
                          href={proj.prod_link}
                          target="_blank"
                          className="text-sm font-medium hover:text-teal-300 transition-colors"
                        >
                          Produção &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= GRIDS MENORES (Formação, Skills, Atuações) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORMAÇÃO */}
          {formacoes.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-teal-300">// Academia</h3>
              <div className="space-y-4">
                {formacoes.map((form: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md"
                  >
                    <h4 className="text-lg font-semibold">{form.curso}</h4>
                    <p className="text-indigo-300 text-sm">
                      {form.instituicao}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-400 text-xs leading-relaxed max-w-[80%]">
                        {form.description}
                      </p>
                      <span className="text-xs font-mono text-gray-500">
                        {form.start_year} - {form.end_year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-300">
                // Tecnologias & Competências
              </h3>
              <div className="space-y-4">
                {skills.map((skill: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md"
                  >
                    <h4 className="text-md font-semibold text-white mb-3">
                      {skill.grupo}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.competencias &&
                        skill.competencias
                          .split(",")
                          .map((comp: string, i: number) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 rounded-full"
                            >
                              {comp.trim()}
                            </span>
                          ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ATUAÇÕES E PUBLICAÇÕES */}
          {atuacoes.length > 0 && (
            <section className="space-y-6 lg:col-span-2">
              <h3 className="text-2xl font-bold text-purple-300">
                // Impacto & Pesquisa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {atuacoes.map((atu: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] uppercase tracking-widest border border-white/20 px-2 py-1 rounded-full">
                        {atu.categoria}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold pr-20">
                      {atu.titulo}
                    </h4>
                    <p className="text-indigo-300 text-sm mt-1">
                      {atu.organizacao}
                    </p>
                    {atu.descricao && (
                      <div
                        className="text-gray-400 text-sm mt-4 prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: atu.descricao }}
                      />
                    )}
                    {atu.link && (
                      <a
                        href={atu.link}
                        target="_blank"
                        className="inline-block mt-4 text-sm text-teal-400 hover:text-teal-200 transition-colors"
                      >
                        Saber mais &rarr;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-8 pb-12 flex flex-col items-center justify-center text-center opacity-60">
          <p className="text-sm">
            Dev.Antigravity &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs mt-2">
            Renderizado estaticamente. Powered by Next.js & Pages CMS.
          </p>
        </footer>
      </div>
    </main>
  );
}
