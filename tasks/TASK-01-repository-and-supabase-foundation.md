# TASK 01 — Repository and Supabase Foundation

## STATUS: DONE

## Objetivo
- Corrigir estrutura do repositório, se necessário;
- Analisar mocks existentes;
- Configurar Supabase;
- Criar migrations;
- Criar schema;
- Criar RLS;
- Preparar Storage;
- Criar seed idempotente com os dados atuais.

## Progresso

### 1. Validação e Reorganização do Repositório
- [x] O repositório estava aninhado na pasta `portifolio-chiqueto`.
- [x] Arquivos movidos com sucesso para a raiz do repositório.
- [x] Aplicativo buildando e linting rodando corretamente (Next.js 15, React 19).

### 2. Análise do Projeto
- **Framework/Versão:** Next.js 15.3.2 / React 19.0.0
- **Roteamento:** App Router
- **UI:** TailwindCSS + Shadcn (Lucide React, Radix UI)

#### Mocks Encontrados:
- **Profile:** Componente `presentation.tsx` (Informações pessoais, contatos e redes sociais).
- **Home/Bio:** Componente `home.tsx` (Cards de sobre mim e o que eu faço).
- **Projetos:** Hardcoded na chamada de componentes `<ProjectCard>` em `components/main-content/projects.tsx`.
- **Experiências:** Hardcoded na chamada de `<ProfessionalExperienceCard>` em `components/main-content/experience.tsx`.
- **Educação:** Hardcoded na chamada de `<EducationCard>` em `components/main-content/experience.tsx`.
- **Skills/Ferramentas:** Hardcoded na chamada de `<SkillsCard>` em `components/main-content/skills.tsx`.

### 3. Supabase Foundation
- [x] Migrations criadas em `supabase/migrations/` (Schema inicial).
- [x] Tabelas estruturadas (profile, projects, project_images, technologies, project_technologies, experiences, education).
- [x] Triggers de `updated_at` criados.
- [x] Políticas RLS (Row Level Security) para leitura pública configuradas.
- [x] Storage: Configurado bucket `portfolio` no `0001_storage.sql` e políticas baseadas para acesso público e de inserção (authenticated).

### 4. Seed dos Dados
- [x] Script de seed construído em `scripts/seed.ts` utilizando as dependências já instaladas `@supabase/supabase-js`.
- [x] Adicionado script `db:seed` no `package.json`.
- [ ] Execução bem-sucedida do seed (Pendente: Necessita da `SUPABASE_SECRET_KEY` no `.env.local` configurado com valor real).
- [x] Criado `.env.example`.

## Status Final
A infraestrutura está preparada. O banco pode ser provisionado executando as migrations no Supabase. O script de seed pode ser executado localmente via `npm run db:seed` uma vez que as credenciais do `.env.local` estiverem preenchidas com a secret key verdadeira. O repositório foi reorganizado com sucesso. Mocks preservados no frontend.

**Próximo Passo:** TASK 02.
