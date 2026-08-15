// src/app/page.tsx
"use client";

import Aurora from "@/components/Aurora";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0B0F19] text-white p-6 md:p-16 overflow-hidden">
      {/* Background Aurora Fluido */}
      <div className="absolute inset-0 opacity-40 z-0">
        <Aurora
          colorStops={["#3D7EAA", "#7DC2A7", "#1E1B4B"]}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Conteúdo do Portfólio (acima da aurora) */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-20">
        <header className="flex justify-between items-center border-b border-white/10 pb-6 backdrop-blur-md">
          <h1 className="text-xl font-bold tracking-wider text-indigo-400">
            Dev.Antigravity
          </h1>
          <span className="text-sm text-gray-300">Laís Costa Baptista</span>
        </header>

        <section className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Código como ferramenta cognitiva. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-teal-300 to-blue-400">
              Produto como impacto social.
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed backdrop-blur-xs">
            Frontend Architect | Product Owner | Educational Tech Researcher
          </p>
        </section>
      </div>
    </main>
  );
}
