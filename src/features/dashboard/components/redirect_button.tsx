// src/features/auth/components/user-info-panel.tsx

'use client';

import { GradientBorder } from '@/shared/components/gradient-border';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ArrowRight, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Dashboard() {
  const router = useRouter();

  const handleGo = () => {
    router.push('/documentation');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <GradientBorder>
        <Card className="flex w-full items-center text-start">
          <CardHeader className="flex w-full">
            <CardTitle className="flex flex-row items-center gap-2 text-xl">
              <TriangleAlert /> Importância do Boilerplate e da Padronização dos Sistemas FESF
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              O uso deste boilerplate para o desenvolvimento FrontEnd representa um avanço
              fundamental na padronização dos sistemas desenvolvidos pela DCTI e para a integração
              de um ecossistema de serviços unidos pelo Portal FESF.
            </p>
            <p> Adotar uma base única e bem estruturada garante que todas as aplicações:</p>
            <ul className="ml-5 list-disc">
              <li>Sigam os mesmos padrões técnicos e boas práticas de desenvolvimento;</li>
              <li>
                {' '}
                Mantenham uma identidade visual coesa, fortalecendo a imagem institucional da
                Fundação;
              </li>
              <li>Sejam mais seguras, escaláveis e fáceis de manter;</li>
              <li>
                Promovam a eficiência no desenvolvimento, evitando retrabalhos e redundâncias.
              </li>
            </ul>
          </CardContent>
          <div className="w-full px-12">
            <CardFooter className="w-full rounded-lg border border-yellow-200 bg-yellow-50 py-2 text-sm text-yellow-600 dark:border-yellow-600 dark:bg-yellow-800/20 dark:text-yellow-600">
              {' '}
              A documentação do boilerplate, contida neste projeto e no readme.md, dispõe de todos
              os informativos necessários acerca de alterações necessárias, alterações proibidas,
              identidade visual, fluxo de validação de usuário, dentre outros informativos. Vale
              ressaltar que este boilerplate foi criado para a criação de projetos integrados ao
              Portal FESF.{' '}
            </CardFooter>
          </div>

          <Button
            onClick={handleGo}
            className="bg-card-foreground/70 hover:bg-card-foreground/55 dark:bg-secondary/70 w-[250px] max-w-[250px] hover:gap-4 dark:text-white/60"
          >
            Acessar Documentação
            <ArrowRight size={20} />
          </Button>
        </Card>
      </GradientBorder>
    </div>
  );
}
