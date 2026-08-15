import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { FileText, Text, Folder, Route, Pencil } from 'lucide-react';
import { GradientBorder } from '@/shared/components/gradient-border';
import { TooltipInfo } from '@/shared/components/tooltip-info';

export default function Documentation() {
  return (
    <div className="container space-y-8">
      <GradientBorder>
        {' '}
        <Card className="flex w-full items-center text-start">
          <CardHeader className="flex w-full">
            <CardTitle className="flex flex-row items-center gap-2 text-xl">
              <FileText /> Sobre o Boilerplate
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-4 text-start">
            <p>
              Este projeto é um <strong>boilerplate </strong> para desenvolvimento do FrontEnd dos
              projetos da DCTI da FESF em <strong>Next.js</strong>, focado em:
            </p>
            <ul className="ml-5 list-disc">
              <li>
                Autenticação segura via <strong>JWT</strong>;
              </li>
              <li>Controle de acesso baseado em perfil de usuário e módulo do sistema;</li>
              <li>
                Arquitetura <strong>modular e escalável</strong> integrado ao{' '}
                <strong>Portal FESF</strong>;
              </li>
              <li>
                Integração nativa com <strong>APIs REST</strong>;
              </li>
              <li>
                Validação com <strong>Zod</strong>;
              </li>
              <li>
                Gerenciamento de estado global com <strong>Zustand</strong> e{' '}
                <strong>React Query</strong>.
              </li>
            </ul>
          </CardContent>
        </Card>
      </GradientBorder>

      <GradientBorder>
        <Card className="flex w-full items-center text-start">
          <CardHeader className="flex w-full">
            <CardTitle className="flex flex-row items-center gap-2 text-start text-xl">
              <Text />{' '}
              <h1>
                Funcionalidades já integradas no Boilerplate e alterações{' '}
                <strong className="text-destructive">PROIBIDAS</strong>{' '}
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Este projeto está previamente configurado para abraçar a criação de sistemas
              integrados ao Portal FESF de módulo único (Projetos que abraçam um único serviço).
              Alguns items do boilerplate <strong className="text-destructive">NÃO</strong> devem
              ser alterados pelos desenvolvedores, sendo eles:
            </p>
            <ul className="ml-5 list-disc">
              <li>
                <strong>CSS global</strong> com a padronização FESF com as cores padrão definidas
                pela ASCOM;
              </li>
              <li>
                Fonte padrão Inter localizada em <code>src/app/layout.tsx</code> definida pela
                ASCOM;
              </li>
              <li>
                Tag <strong>body</strong> localizada em <code>src/app/layout.tsx </code> ;
              </li>
              <li>
                Página de <strong> redirecionamento do usuário </strong> do portal para o sistema{' '}
                <code>src/app/page.tsx </code>
              </li>
              <li>
                Página de <strong> validação do usuário </strong> no sistema{' '}
                <code> src/app/(protected)/auth/page.tsx </code>
              </li>
              <li>
                <strong> Layouts </strong> da rotas de autenticação e protegida
                <code>src/app/(protected)/layout.tsx</code> |{' '}
                <code>src/app/(auth)/layout.tsx </code>;
              </li>
              <li>
                Rota e página de <strong>usuário não autenticado </strong>{' '}
                <code>src/app/(auth)/no-auth/page.tsx</code>
              </li>
              <li>Endpoints e demais requisições relacionadas ao Microsserviço de Autenticação </li>
            </ul>
          </CardContent>
        </Card>
      </GradientBorder>
      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="structure">
          <AccordionTrigger className="flex cursor-pointer flex-row items-center justify-between gap-2 text-start text-xl hover:no-underline">
            <div className="flex flex-row items-center gap-4">
              <Folder /> Estrutura de Pastas
            </div>
          </AccordionTrigger>
          <AccordionContent className="!bg-card-foreground/40 flex-start grid grid-cols-4 grid-rows-1 gap-6 space-y-4">
            <Card className="!min-h-[30rem]">
              <CardHeader>
                <CardTitle>/public</CardTitle>
              </CardHeader>
              <CardContent className="flex w-full flex-col text-start">
                Armazena arquivos estáticos (<strong>imagens, logos, favicons</strong>).
              </CardContent>
            </Card>

            <Card className="!min-h-[30rem]">
              <CardHeader>
                <CardTitle>
                  <code>/src/app</code>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex w-full flex-col text-start">
                <ul className="ml-5 list-disc">
                  <li>Define rotas e páginas.</li>
                  <li>
                    <code>layout.tsx</code>: layout global.
                  </li>
                  <li>
                    <code>globals.css</code>: estilos globais.
                  </li>
                  <hr className="mt-4 mb-4" />
                  <TooltipInfo
                    label={
                      <li>
                        Pasta <code>(auth)</code>: rotas &quot;públicas&ldquo;
                      </li>
                    }
                    content={
                      <span>
                        Essa pasta diz respeito a autenticação do usuário no serviço. O uso das
                        aspas para a palavra públicas possui o seguinte sentido: para acessar o
                        sistema o usuário terá que estar autenticado no portal, toda verificação de
                        autenticação (login e validação de usuário) é feita no Portal FESF que
                        utiliza um token temporário para o usuário; Ao acessar um serviço, o portal
                        transfere via query params o token do usuário para o serviço acessado. Logo,
                        a rota de autenticação do usuário serve para conferir esse token do serviço
                        e salvá-lo no cookie, sobrescrevendo o token temporário do portal no sistema
                        acessado; essa troca de token e verificação de permissão no sistema é feita
                        na página principal do sistema <code> src/app/page.tsx</code>.
                      </span>
                    }
                  />

                  <TooltipInfo
                    label={
                      <li>
                        Pasta <code>(protected)</code>: rotas protegidas, só acessíveis via
                        &quot;autenticação&ldquo;.
                      </li>
                    }
                    content={
                      <span>
                        Essa pasta diz respeito aos arquivos que só podem ser acessados após o
                        salvamento do token do sistema no cookie feito na rota (auth).
                      </span>
                    }
                  />
                  <li>
                    <code>terms-and-policy/</code>: página institucional.
                  </li>
                </ul>
                <em>
                  O desenvolvedor deve adaptar as rotas conforme o fluxo do seu projeto; exceto os
                  arquivos mencionados anteriormente que não podem ser alterados.
                </em>
              </CardContent>
            </Card>

            <Card className="!min-h-[30rem]">
              <CardHeader>
                <CardTitle>
                  {' '}
                  <code>/src/features</code>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex w-full flex-col text-start">
                Cada funcionalidade ou domínio do sistema deve ter sua própria pasta, com:
                <ul className="ml-5 list-disc">
                  <li>
                    <strong>api/</strong>: chamadas à API;
                  </li>
                  <li>
                    <strong>components/</strong>: componentes específicos da feature;
                  </li>
                  <li>
                    <strong>hooks/</strong>: hooks relacionados;
                  </li>
                  <li>
                    <strong>schemas/</strong>: validação de dados;
                  </li>
                  <li>
                    <strong>store/</strong>: Zustand store para o estado da feature.
                  </li>
                </ul>
                <em>
                  Toda feature criada deve seguir esse padrão para manter a escalabilidade e
                  organização dos projetos.
                </em>
              </CardContent>
            </Card>

            <Card className="!min-h-[30rem]">
              <CardHeader>
                <CardTitle>
                  {' '}
                  <code>/src/shared</code>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex w-full flex-col text-start">
                Código reutilizável e comum:
                <ul className="ml-5 list-disc">
                  <li>
                    <strong>lib/</strong>: utilitários gerais, como <code>ApiClient</code>;
                  </li>
                  <li>
                    <strong>schemas/</strong>: validação de entidades comuns;
                  </li>
                  <TooltipInfo
                    label={
                      <li>
                        <strong>components/</strong>: UI compartilhada;
                      </li>
                    }
                    content={
                      <span>
                        Os componentes dispostos nos projetos FrontEnd da DCTI são da biblioteca
                        Shadcn{' '}
                        <a
                          href="https://ui.shadcn.com/"
                          className="underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ui.shadcn.com
                        </a>
                      </span>
                    }
                    position="left"
                  />
                  <li>
                    <strong>utils/</strong>: funções auxiliares.
                  </li>
                </ul>
                <em>Mantenha essa separação para evitar duplicação de código.</em>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="api">
          <AccordionTrigger className="flex cursor-pointer flex-row items-center justify-between gap-2 text-start text-xl hover:no-underline">
            <div className="flex flex-row items-center gap-4">
              <Text /> Organização das Requisições à API
            </div>
          </AccordionTrigger>

          <AccordionContent className="!bg-card-foreground/40 space-y-4">
            <Card>
              <CardContent className="flex w-full flex-col text-start">
                <p>
                  Toda comunicação com a API é feita através do <strong>ApiClient</strong> em
                  <code> /src/shared/lib/api-client.ts </code>, que centraliza as configurações das
                  requisições.
                </p>
                <ul className="ml-5 flex list-disc flex-col space-y-2">
                  <TooltipInfo
                    label={
                      <li>
                        <code>endpoints.ts</code>: guarda os endpoints da API
                      </li>
                    }
                    content={
                      <span>
                        Define de forma padronizada todas as URLs da API, evitando erros de
                        digitação e facilitando manutenção. Use chaves e parâmetros dinâmicos para
                        montar rotas complexas.
                      </span>
                    }
                  />

                  <TooltipInfo
                    label={
                      <li>
                        <code>query.ts</code>: consultas (GET)
                      </li>
                    }
                    content={
                      <span>
                        Arquivo responsável por funções que realizam chamadas de leitura na API,
                        como buscas de listas e detalhes. Integrado ao React Query para cache
                        automático e invalidação eficiente.
                      </span>
                    }
                  />

                  <TooltipInfo
                    label={
                      <li>
                        <code>mutation.ts</code>: alterações (POST, PUT, DELETE)
                      </li>
                    }
                    content={
                      <span>
                        Contém funções para criar, atualizar ou excluir dados via API. Utiliza React
                        Query para controle de estado, manipulação otimista e feedback ao usuário.
                      </span>
                    }
                  />

                  <li>
                    Schemas Zod garantem a <strong>validação de dados</strong>{' '}
                    <em>antes e depois</em> das requisições.
                  </li>
                  <li>
                    Autenticação via <strong>JWT</strong>, armazenado em cookie{' '}
                    <code>authToken</code>.
                  </li>
                  <li>
                    Integração com Zustand e React Query para{' '}
                    <strong>sincronização de estado</strong> e <strong>cache</strong>.
                  </li>
                </ul>
                <em>
                  Adapte <code>endpoints.ts</code>, <code>mutation.ts</code> e <code>query.ts</code>{' '}
                  conforme a API do sistema desenvolvido. Não remova os endpoints referentes ao
                  Microsserviço de Autenticação.
                </em>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="auth">
          <AccordionTrigger className="flex cursor-pointer flex-row items-center justify-between gap-2 text-start text-xl hover:no-underline">
            <div className="flex flex-row items-center gap-4">
              <Route /> Fluxo de Autenticação
            </div>
          </AccordionTrigger>
          <AccordionContent className="!bg-card-foreground/40 space-y-4">
            <Card>
              {' '}
              <ol className="ml-12 flex list-decimal flex-col justify-start gap-2 text-start">
                <li className="">
                  Usuário faz login no Portal FESF : token temporário é salvo em{' '}
                  <strong>cookie</strong>.
                </li>
                <li>
                  Usuário, logado no Portal FESF, acessa o serviço desejado : token JWT do serviço é
                  salvo em <strong>cookie</strong>.
                </li>
                <li>
                  <code>middleware.ts do serviço</code>: protege rotas e valida o token.
                </li>
                <li>
                  <code>useCurrentUser</code>: busca dados do usuário no microsserviço e sincroniza
                  com Zustand.
                </li>
                <li>
                  Estado global acessível via <code>useAuth</code> e <code>useUser</code>.
                </li>
              </ol>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="customize">
          <AccordionTrigger className="flex cursor-pointer flex-row items-center justify-between gap-2 text-start text-xl hover:no-underline">
            <div className="flex flex-row items-center gap-4">
              <Pencil /> Como Personalizar e Utilizar
            </div>
          </AccordionTrigger>
          <AccordionContent className="!bg-card-foreground/40 space-y-4">
            <Card>
              <CardContent className="flex w-full flex-col text-start">
                <ul className="ml-5 flex list-disc flex-col space-y-2">
                  <li>
                    Configure <code>endpoints.ts</code> com URLs da API do serviço a ser
                    desenvolvido;
                  </li>
                  <li>
                    Ajuste os <strong>schemas Zod</strong> conforme contrato de dados;
                  </li>
                  <li>
                    Adicione novas features criando subpastas em <code>/src/features</code>;
                  </li>
                  <li>
                    Exclua os arquivos da documentação do boilerplate{' '}
                    <code>
                      {' '}
                      src/features/documentation
                      src/features/dashboard/components/redirect_button.tsx
                    </code>{' '}
                    .
                  </li>
                </ul>
                <em>
                  Estas são as principais alterações para adaptar o boilerplate ao seu projeto
                </em>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
