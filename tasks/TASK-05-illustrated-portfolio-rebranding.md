# TASK 05 — Illustrated Interactive Portfolio Rebranding

## 1. Visão Geral e Conceito Visual
Rebranding autoral completo do portfólio pessoal de **Luís Felipe Mozer Chiqueto**, inspirado na estética de pôster ilustrado com paisagens vetoriais multicamadas, pôr do sol, montanhas, florestas e pássaros em voo.

### Pilares Fundamentais:
1. **Identidade Artística Marcante:** Paisagem vetorial com profundidade, camadas de floresta em vinho profundo (`#22051F`), montanhas em coral/rosa queimado (`#D65F67` / `#F59879`), céu creme (`#F9E6C1`) e sol poente. Elementos rompem os limites do card arredondado (pássaros e nuvens ultrapassam a moldura para criar sensação de 3D e espaço).
2. **Interatividade e Parallax Suave:** Movimento de camadas com *Motion for React* (`motion`), sensível ao scroll e mouse, com respeito estrito a `prefers-reduced-motion`.
3. **Credibilidade Técnica:** Apresentação profissional consumindo 100% dos dados reais do Supabase (Perfil, Projetos, Experiências, Educação, Tecnologias), sem mocks e com links para os estudos de caso individuais (`/projects/[slug]`).

---

## 2. Paleta de Cores e Tokens
- **Creme / Céu Base:** `#F9E6C1` / `#FBF4EB`
- **Coral / Brilho do Pôr do Sol:** `#F59879`
- **Rosa Queimado / Montanhas Médias:** `#D65F67`
- **Vinho Médio / Floresta Intermediária:** `#4A1739`
- **Vinho Profundo / Floresta em Primeiro Plano:** `#22051F`
- **Noite / Silhuetas Noturnas:** `#140213`
- **Sol / Halo:** `#FFF3D6`
- **Dourado de Destaque:** `#F4B342`

---

## 3. Arquitetura das 6 Cenas

1. **Cena 01 — Opening / Pôster Ilustrado Interativo:**
   - Grande painel com cantos arredondados (`rounded-[36px]` a `rounded-[48px]`).
   - Camadas vetoriais com efeito Parallax (Céu, Sol poente com halo, Montanhas distantes, Floresta intermediária, Floresta frontal em vinho profundo, Nuvens em relevo saindo da moldura, Pássaro majestoso cruzando o topo do card).
   - Tipografia geométrica marcante: "LUÍS FELIPE MOZER CHIQUETO", "SOFTWARE DEVELOPER", "Backend · Web · Mobile", stacks e botão de exploração.
   - Ícone autoral de navegação com 4 quadradinhos no canto superior direito (`Grid2X2`).

2. **Cena 02 — Sobre Mim (A Clareira / Perfil):**
   - Transição suave de atmosfera mantendo montanhas laterais e silhuetas de pinheiros.
   - Apresentação da bio real, formação acadêmica (UNIFACEF, SENAI, ETEC), localização e foto de perfil integrada com selo ilustrado.

3. **Cena 03 — Projetos (Janelas para os Produtos):**
   - Vitrine dos projetos reais cadastrados no Supabase com imagens/gráficos de capa, tipo de projeto (Web, Mobile, Backend), stack técnica e link para a página detalhada.

4. **Cena 04 — Experiência Profissional (A Jornada / Trilha):**
   - Trilha com marcos de evolução profissional: Usina Alta Mogiana (Jr. e Aprendiz) e ACEDATA Software (Estágio), com logos reais e atribuições detalhadas.

5. **Cena 05 — Tecnologias (Módulos da Paisagem):**
   - Agrupamento refinado por domínios: Backend, Frontend, Mobile, Bancos de Dados, Ferramentas & Cloud e Design/IA.

6. **Cena 06 — Contato & Encerramento (Crepúsculo):**
   - Paisagem de encerramento em tons noturnos com silhuetas fortes, botões de cópia rápida de e-mail, LinkedIn, GitHub, Instagram e download do currículo.

---

## 4. Navegador Autoral de Cenas
- Botão inspirado no ícone de 4 quadradinhos da referência.
- Abre um menu modal/drawer cinematográfico com pré-visualização das 6 cenas e atalho rápido por teclado (`1-6`, `Esc`).

---

## 5. Implementação Técnica
- Biblioteca de animação: `motion` (Motion for React).
- Suporte a `prefers-reduced-motion`.
- Sem quebra de layout em mobile (responsivo para 360px, 390px, 768px, 1440px e 1920px).
