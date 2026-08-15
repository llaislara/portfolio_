"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white p-8 md:p-16">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header / Navegação minimalista */}
        <header className="flex justify-between items-center border-b border-white/10 pb-6">
          <h1 className="text-xl font-bold tracking-wider text-indigo-400">
            // Dev.Antigravity
          </h1>
          <span className="text-sm text-gray-400">Laís Costa Baptista</span>
        </header>

        {/* Hero Section */}
        <section className="space-y-6">
          <p className="text-gray-400 text-lg">
            Frontend Architect | Product Owner | Educational Tech Researcher
          </p>
        </section>

        {/* Seção About Me / Resumo */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-3 text-indigo-300">
              Raízes Acadêmicas
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bacharel em Ciência da Computação pela UNIFACS e pesquisadora
              focada na interseção entre tecnologia, educação e o
              desenvolvimento do pensamento computacional.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-3 text-teal-300">
              // Atuação Profissional
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Atuação dupla como Product Owner e Lead Frontend na FESF-SUS,
              unindo visão estratégica de produto à execução técnica de
              interfaces complexas e escaláveis.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
