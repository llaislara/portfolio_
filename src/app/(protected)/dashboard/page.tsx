// src/app/(protected)/dashboard/page.tsx
'use client';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { Dashboard } from '@/features/dashboard/components/redirect_button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

export default function AuthPage() {
  const { user } = useAuth();

  return (
    <div className="flex !w-full flex-col">
      <div className="flex w-full flex-col items-center text-start md:flex-row md:justify-between">
        <h1 className="text-[2rem]"> Dashboard</h1>
        <p className="text-card-foreground/60 text-sm"> Olá, {user?.name}!</p>
      </div>
      <hr className="!border-card-foreground/25 mt-2 mb-4 rounded-full border-[.15rem]" />
      <Dashboard />
      <Card className="mt-4">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="bg-card-foreground/40 grid w-full grid-cols-2">
            <TabsTrigger
              className="data-[state=active]:bg-card-foreground/60 text-card-foreground font-normal data-[state=active]:text-white"
              value="summary"
            >
              Resumo
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-card-foreground/60 text-card-foreground font-normal data-[state=active]:text-white"
              value="benefits"
            >
              Benefícios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Card className="flex !min-h-[13rem] !w-full justify-start text-start">
              <CardContent className="text-muted-foreground">
                <p>Estrutura base para sistemas do ecossistema Portal FESF, com foco em:</p>
                <ul className="ml-5 list-disc">
                  <li>Arquitetura organizada e modular;</li>
                  <li>Integração nativa com API REST;</li>
                  <li>Autenticação segura e escalável;</li>
                  <li>Validação de usuário garantida.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card className="flex !min-h-[13rem] !w-full justify-start text-start">
              <CardContent>
                <ul className="text-muted-foreground ml-5 list-disc">
                  <li>Arquitetura modular para fácil manutenção;</li>
                  <li>Fluxo de autenticação seguro com JWT;</li>
                  <li>Validação completa com Zod;</li>
                  <li>Integração com React Query e Zustand;</li>
                  <li>Estrutura pronta para escalar e evoluir;</li>
                  <li>
                    UI consistente utilizando a biblioteca <strong>shadcn/ui</strong>.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
