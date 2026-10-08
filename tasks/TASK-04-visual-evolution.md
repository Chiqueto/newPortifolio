# TASK-04 — Evolução Visual do Portfólio

## Objetivo

Evoluir a identidade visual do portfólio público, preservando o núcleo da identidade anterior (dark theme, sidebar, accent dourado, sensação de workspace/interface) mas modernizando tipografia, hierarquia, layout e componentes para transmitir maturidade profissional.

---

## Identidade Antiga — O Que Foi Analisado

| Elemento              | Situação Anterior                              |
|-----------------------|------------------------------------------------|
| Tema                  | Dark com oklch custom                          |
| Layout                | 3 colunas: Sidebar esq / Navbar dir / Conteúdo |
| Navegação             | Tabs isoladas (Tab Provider) — renderiza 1 seção por vez |
| Fontes                | Poppins (body) + Shrikhand (headings decorativo) + Inter |
| Accent                | Dourado espalhado em bordas grossas inteiriças  |
| Avatar                | Imagem cartoon 3D flip com GitHub              |
| Cards                 | Bordas sólidas espessas, sombra, muito preenchimento |
| Projetos              | Grid simples de cards iguais                   |

---

## Decisões de Design

### PRESERVADO
- Dark theme como padrão imutável (sem toggle de tema na UI pública)
- Sidebar lateral fixa como elemento principal de navegação (desktop)
- Accent dourado como assinatura visual (`--gold: 43 74% 55%`)
- Linguagem técnica: labels uppercase em font-mono, índices numéricos
- Layout assimétrico: sidebar fixa + conteúdo principal
- Atmosfera de workspace / documentação técnica

### MODERNIZADO
- **Tipografia:** `Inter` como fonte única + `Geist Mono` para labels técnicos
- **Design System:** Paleta HSL semântica com variáveis `--background`, `--surface`, `--gold`, `--border`
- **Sidebar:** Unificação de `Presentation` + `Navbar` num componente único com scrollspy automático, identidade tipográfica, contexto de emprego/status, links
- **Navegação:** De "tabs que trocam seções" para **scroll longo sequencial com destaque automático da seção ativa na sidebar**
- **Projetos:** De grid de cards para **índice editorial numerado** com hover preview de imagem
- **Experiência:** De cards com imagem+bordas para **lista estruturada por ano** com marcação gold
- **Skills:** De "logo wall" para **listas agrupadas por domínio** com ícones discretos

### REMOVIDO
- Avatar cartoon 3D flip → substituído por identidade tipográfica (nome em 2 linhas)
- Fontes Poppins e Shrikhand
- Variáveis oklch customizadas (substituídas por HSL semântico)
- Tab Provider e navegação baseada em clique-de-aba
- Bordas grossas douradas contornando todos os elementos
- Layout de 3 colunas (Presentation | Content | Navbar)

---

## Paleta

| Token             | Valor HSL         | Uso                         |
|-------------------|-------------------|-----------------------------|
| `--background`    | `222 18% 9%`      | Fundo geral                 |
| `--surface`       | `222 16% 14%`     | Cards, formulários          |
| `--surface-muted` | `222 16% 16%`     | Itens secundários           |
| `--foreground`    | `210 20% 93%`     | Texto principal             |
| `--muted-foreground` | `215 14% 50%`  | Texto auxiliar              |
| `--border`        | `222 14% 18%`     | Separadores                 |
| `--gold`          | `43 74% 55%`      | Accent, links, ativo, status |
| `--gold-muted`    | `43 50% 30%`      | Backgrounds sutis gold      |

---

## Tipografia

- **Fonte principal:** Inter (sans-serif) — headings e body
- **Fonte técnica:** Geist Mono — labels, índices, metadados, stack chips

---

## Estrutura de Navegação

### Desktop
- Sidebar fixa à esquerda (280px)
- Links ancorados com scrollspy (`IntersectionObserver`)
- Item ativo destacado em gold + bullet gold à direita
- Bloco de contexto (Empresa, Status, links)

### Mobile
- Header sticky com nome + título
- Botão de menu que abre dropdown com os mesmos itens numerados

---

## Componentes Criados/Alterados

| Arquivo                                      | Ação       | Descrição                                          |
|----------------------------------------------|------------|-----------------------------------------------------|
| `app/globals.css`                            | Refatorado | Novo design system HSL                              |
| `app/layout.tsx`                             | Refatorado | Inter + Geist Mono, dark forçado, SEO               |
| `app/page.tsx`                               | Refatorado | Layout sequencial, Sidebar, sem TabProvider         |
| `components/sidebar.tsx`                     | Criado     | Sidebar unificada com scrollspy                     |
| `components/sections/overview.tsx`           | Criado     | Headline, bio, stack chips, links                   |
| `components/sections/projects.tsx`           | Criado     | Índice editorial + hover preview                    |
| `components/sections/experience.tsx`         | Criado     | Timeline por ano sem cards                          |
| `components/sections/capabilities.tsx`       | Criado     | Grupos de skills com ícones discretos               |
| `components/sections/contact.tsx`            | Criado     | CTA + links rápidos + formulário mono               |
| `app/projects/[slug]/page.tsx`               | Criado     | Case study — mesmo dark identity                    |
| `features/public/data.ts`                    | Modificado | + `getPublicProjectBySlug`                          |

---

## Resultado do Build

```
✓ Compiled successfully in 8.4s
✓ TypeScript: sem erros
✓ 14 páginas geradas (7 workers)
✓ Código 0 — build limpo
```
