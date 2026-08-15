# Boilerplate FESF - Documentação

### Ao iniciar o projeto e executá-lo localmente, uma documentação mais explicativa será exibida.

Este projeto é um boilerplate React + Next.js voltado para sistemas administrativos com autenticação baseada em token JWT, autorização baseada em módulos, papéis (roles) e permissões.

---

## Requisitos para rodar o projeto

Antes de iniciar, certifique-se de que seu ambiente está preparado com os seguintes requisitos:

- **Node.js** versão 18 ou superior
- **pnpm** (gerenciador de pacotes): https://pnpm.io/installation
- Um backend configurado e funcionando que forneça os endpoints de autenticação (`/auth/me`, etc.)

---

## Tecnologias utilizadas

- **React** 18+
- **Next.js** 14+ com App Router (`app/`)
- **TypeScript**
- **Zustand** (estado global para autenticação)
- **React Hook Form + Zod** (validação de formulários)
- **TanStack Query** (requisições e cache de dados)
- **TailwindCSS**
- **Sonner** (toasts)
- **Lucide Icons** (ícones SVG)
- **Axios** (com `ApiClient` customizado)
- **JWT** (middleware de autenticação)

---

## Como rodar o projeto

1. **Instale as dependências:**

   ```bash
   pnpm install
   ```

2. **Crie o arquivo `.env.local` com as variáveis de ambiente necessárias:**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3333
   JWT_SECRET=sua_chave_secreta_para_teste
   ```

3. **Rode o projeto localmente:**

   ```bash
   pnpm dev
   ```

4. **Acesse o sistema em:** [http://localhost:3000](http://localhost:3000)

---

## Autenticação

O token JWT é capturado da URL (query param `?access_token=...`) na primeira carga do sistema e salvo em cookie + localStorage.

- O endpoint `/auth/me` é chamado automaticamente para carregar o usuário autenticado.
- Se o token for inválido, o usuário é redirecionado para `/no-auth`.

---

## Observações

- O token é lido nos interceptors do Axios automaticamente.
- O `RouteGuard` valida permissões dinamicamente no client.
- O `middleware.ts` aplica verificação JWT básica no lado do servidor.
