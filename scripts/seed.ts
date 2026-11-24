import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Carregar variáveis do .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERRO: As variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY precisam estar no .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helpers para slug
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seed = async () => {
  console.log("Iniciando seed dos dados...");

  // 1. Profile
  const profile = {
    name: "Luís Felipe Mozer Chiqueto",
    headline: "Web | Mobile Developer",
    bio: "Estudante de Engenharia de Software na UNIFACEF - Franca, com formação técnica em Desenvolvimento de Sistemas e experiência prática em desenvolvimento full stack. Atualmente, atuo como Jovem Aprendiz na Usina Alta Mogiana, onde contribuo para o desenvolvimento de sistemas, além de ter iniciado minha trajetória como estagiário na ACEDATA em São Joaquim da Barra.\n\nMinha paixão pela tecnologia vai além da teoria. Ao longo da minha jornada, tive a oportunidade de desenvolver projetos de forma prática, incluindo o Classline, uma aplicação voltada para o gerenciamento de instituições de ensino, onde me aprofundei em backend com Java Spring Boot. Além disso, realizei trabalhos freelance, criando páginas e sistemas, assim aprimorando minhas habilidades de Full Stack.",
    email: "lfchiqueto@gmail.com",
    phone: "+55 (16) 99968-6044",
    location: "São Joaquim da Barra, SP",
    birth_date: "2005-03-08",
    github_url: "https://github.com/Chiqueto",
    linkedin_url: "https://www.linkedin.com/in/luis-felipe-chiqueto/",
    instagram_url: "https://www.instagram.com/lfchiqueto?igsh=MXhxcWV3c2U1Nm9meg==",
    resume_url: "https://drive.google.com/file/d/1y_QgyXoDvTp3gK6U2ful3pgZnXwOhvpF/view?usp=sharing",
    avatar_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/profile/avatar.png"
  };

  const { error: profileError } = await supabase.from('profile').upsert({ id: '00000000-0000-0000-0000-000000000001', ...profile });
  if (profileError) console.error("Erro no profile:", profileError);
  else console.log("Profile ok");

  // 2. Education
  const educations = [
    { institution: "ETEC - Pedro Badran", course: "Formação Técnica em Desenvolvimento de Sistemas", start_date: "2021-01-01", end_date: "2022-12-31", sort_order: 1 },
    { institution: "UNIFACEF - Franca", course: "Engenharia de Software", degree: "Bacharelado", start_date: "2023-01-01", end_date: "2026-12-31", sort_order: 2 },
    { institution: "SENAI - Franca", course: "Formação Técnica em Desenvolvimento de Sistemas", start_date: "2024-01-01", end_date: "2025-12-31", sort_order: 3 }
  ];

  // Education idempotente: limpa e reinsere
  await supabase.from('education').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: edError } = await supabase.from('education').insert(educations);
  if (edError) console.error("Erro education:", edError);
  else console.log("Education ok");

  // 3. Experiences
  const experiences = [
    { company: "ACEDATA Software", role: "Programador Estagiário", start_date: "2023-03-01", end_date: "2023-12-31", description: "Como estagiário, fui responsável por desenvolver correções e melhorias no sistema ERP da empresa, tanto em ambientes Windows quanto Web. Para isso, aprendi a utilizar Genexus, a principal tecnologia empregada no desenvolvimento das soluções. Durante essa experiência, não apenas refinei minha lógica de programação, mas também adquiri habilidades essenciais de trabalho em equipe, aplicando a metodologia ágil SCRUM.", company_logo_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/experiences/acedata.png", sort_order: 2 },
    { company: "Usina Alta Mogiana", role: "Aprendiz de Desenvolvimento de Sistemas", start_date: "2024-01-01", current: true, description: "Como jovem aprendiz, participei do curso técnico de Desenvolvimento de Sistemas promovido pelo SENAI, além de ser integrado às atividades de T.I. na usina. Essas atividades incluíram desenvolvimento de sistemas, manutenção de sistemas embarcados, suporte à infraestrutura, automação industrial e inovação tecnológica. Essas experiências me permitiram expandir minha visão e conhecimento sobre tecnologia e suas diversas aplicações nas áreas operacionais da usina.", company_logo_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/experiences/alta-mogiana.png", sort_order: 1 }
  ];
  await supabase.from('experiences').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: expError } = await supabase.from('experiences').insert(experiences);
  if (expError) console.error("Erro experiences:", expError);
  else console.log("Experiences ok");

  // 4. Technologies
  const techs = [
    { name: "React", category: "FRONTEND" },
    { name: "Javascript", category: "FRONTEND" },
    { name: "Typescript", category: "FRONTEND" },
    { name: "Node.Js", category: "BACKEND" },
    { name: "Express", category: "BACKEND" },
    { name: "Next.js", category: "FRONTEND" },
    { name: "TailwindCSS", category: "FRONTEND" },
    { name: "MongoDB", category: "DATABASE" },
    { name: "PostgreSQL", category: "DATABASE" },
    { name: "Sql Server", category: "DATABASE" },
    { name: "Java", category: "BACKEND" },
    { name: "Spring Boot", category: "BACKEND" },
    { name: "React Native", category: "MOBILE" },
    { name: "Figma", category: "DESIGN" },
    { name: "Git", category: "TOOLS" },
    { name: "Github", category: "TOOLS" },
    { name: "Postman", category: "TOOLS" },
    { name: "Insomnia", category: "TOOLS" },
    { name: "Swagger", category: "TOOLS" },
    { name: "Python", category: "BACKEND" },
    { name: "FastAPI", category: "BACKEND" },
    { name: "Three.js", category: "FRONTEND" },
    { name: "React Three Fiber", category: "FRONTEND" },
    { name: "Kotlin", category: "MOBILE" },
    { name: "WearOS", category: "MOBILE" },
    { name: "Docker", category: "TOOLS" },
    { name: "WebSocket", category: "BACKEND" },
    { name: "Redis", category: "DATABASE" },
    { name: "Cloudflare R2", category: "TOOLS" },
    { name: "Asaas", category: "TOOLS" },
    { name: "Unity 3D", category: "TOOLS" },
    { name: "C#", category: "BACKEND" },
    { name: "OpenCV", category: "TOOLS" },
    { name: "YOLO", category: "TOOLS" },
    { name: "PLpgSQL", category: "DATABASE" },
    { name: "Supabase", category: "DATABASE" }
  ].map((t, i) => ({ ...t, slug: slugify(t.name), sort_order: i }));

  const { error: techError } = await supabase.from('technologies').upsert(techs, { onConflict: 'slug' });
  if (techError) console.error("Erro technologies:", techError);
  else console.log("Technologies ok");

  const { data: allTechs } = await supabase.from('technologies').select('id, name, slug');
  const techMap = new Map<string, string>();
  allTechs?.forEach(t => {
    techMap.set(t.name.toLowerCase(), t.id);
    techMap.set(t.slug.toLowerCase(), t.id);
  });

  // 5. Projects
  const projectsData = [
    {
      title: "Marca-lá",
      slug: "marcala",
      short_description: "SaaS completo de gestão e automação de agendamentos online para salões, barbearias e clínicas, eliminando horários ociosos com lembretes automáticos e controle financeiro.",
      description: "O Marca-lá é uma plataforma completa desenvolvida para transformar a gestão de agendamentos e atendimento em estabelecimentos de serviços. O sistema oferece links exclusivos de agendamento por loja, reduz no-shows com lembretes e notificações push, organiza equipes com bloqueios de grade e oferece dashboard financeiro com projeções e KPIs em tempo real. A arquitetura backend foi construída em Java 21 com Spring Boot e Spring Security, integrada ao gateway de pagamentos Asaas e ao Cloudflare R2 para armazenamento de mídias. O frontend em Next.js (App Router) garante performance e responsividade em qualquer dispositivo, com deploy conteinerizado via Docker em VPS dedicada sob domínio personalizado.",
      status: "PRODUCTION",
      project_type: "WEB",
      featured: true,
      published: true,
      live_url: "https://usemarcala.com.br/",
      repository_url: null,
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/marcala.png",
      sort_order: 0,
      techs: ["Java", "Spring Boot", "Next.js", "Typescript", "TailwindCSS", "PostgreSQL", "Docker", "Cloudflare R2", "Asaas"]
    },
    {
      title: "Trainvy (FIT.AI)",
      slug: "trainvy",
      short_description: "Plataforma de inteligência artificial para prescrição, periodização e validação de treinos físicos com arquitetura RAG e modelos estruturados.",
      description: "O Trainvy é uma solução completa de ponta a ponta voltada para profissionais de educação física e praticantes avançados. O sistema integra inteligência artificial utilizando Retrieval-Augmented Generation (RAG) sobre literatura científica e diretrizes cinesiológicas em PDF para gerar e estruturar prescrições de treinos altamente individualizadas. Desenvolvido com frontend e APIs em Next.js / TypeScript, camada de dados reativa no Supabase com lógica em PLpgSQL e deploy contínuo na Vercel.",
      status: "PRODUCTION",
      project_type: "WEB",
      featured: true,
      published: true,
      live_url: "https://trainvy.vercel.app/",
      repository_url: "https://github.com/Chiqueto/trainvy-frontend",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/trainvy.png",
      sort_order: 1,
      techs: ["Next.js", "Typescript", "React", "TailwindCSS", "Supabase", "PostgreSQL", "PLpgSQL"]
    },
    {
      title: "SetVision - AI Volleyball Tracking",
      slug: "setvision",
      short_description: "Plataforma com visão computacional (YOLO11) para detecção de trajetórias e análise de treinamentos de vôlei com pipeline de treinamento web.",
      description: "O SetVision é uma plataforma experimental avançada para captura e análise técnica de treinos de voleibol através de visão computacional. O sistema realiza upload de gravações de partidas e treinos, processando os frames com OpenCV e modelos YOLO11 para detecção e rastreamento da trajetória 2D da bola. Inclui interface com fila assistida para anotação e revisão humana de frames complexos, além de painel de treinamento de novos pesos e avaliação de performance de modelos de machine learning diretamente pela web.",
      status: "DEVELOPMENT",
      project_type: "WEB",
      featured: true,
      published: true,
      live_url: null,
      repository_url: "https://github.com/Chiqueto/Set-Vision",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/setvision.png",
      sort_order: 2,
      techs: ["Python", "FastAPI", "OpenCV", "YOLO", "Next.js", "Typescript", "TailwindCSS"]
    },
    {
      title: "SmartRep - IoT & Wearable Gym Tracking",
      slug: "smartrep",
      short_description: "Ecossistema completo de TCC composto por app WearOS (smartwatch), app mobile e backend Spring Boot para validação de repetições.",
      description: "Trabalho de Conclusão de Curso integrando hardware vestível e software corporativo para musculação. O projeto engloba um aplicativo nativo para smartwatches WearOS desenvolvido em Kotlin para aquisição de telemetria dos sensores inerciais (acelerômetro e giroscópio) em tempo de execução, um aplicativo mobile moderno em React Native para acompanhamento do praticante e uma API de alta performance em Java com Spring Boot e PostgreSQL empacotada em Docker.",
      status: "ACADEMIC",
      project_type: "MOBILE",
      featured: true,
      published: true,
      live_url: null,
      repository_url: "https://github.com/Chiqueto/SmartRepMobile",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/smartrep.png",
      sort_order: 3,
      techs: ["Kotlin", "WearOS", "React Native", "Java", "Spring Boot", "PostgreSQL", "Docker"]
    },
    {
      title: "Gym Twin - Digital Twin 3D",
      slug: "gym-twin",
      short_description: "Gêmeo digital e visualização 3D interativa de ecossistema de academia com renderização imersiva via Three.js e React Three Fiber.",
      description: "Aplicação imersiva focada no conceito de Digital Twin para ambientes fitness. Desenvolvido inteiramente no frontend com Three.js e React Three Fiber, o projeto permite a navegação espacial por maquinários e infraestrutura de treino, demonstrando o potencial de gêmeos digitais para mapeamento de uso, disposição biomecânica e telemetria interativa.",
      status: "DEVELOPMENT",
      project_type: "WEB",
      featured: true,
      published: true,
      live_url: "https://gym-twin-frontend.vercel.app/",
      repository_url: "https://github.com/Chiqueto/digital-twin",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/gym-twin.png",
      sort_order: 4,
      techs: ["Three.js", "React Three Fiber", "Next.js", "Typescript", "TailwindCSS"]
    },
    {
      title: "Simulação Biomecânica 3D",
      slug: "digital-twin-biomecanica",
      short_description: "Simulador biomecânico 3D de Hack de Agachamento 45° com física em tempo real, anilhas dinâmicas e telemetria de força.",
      description: "Módulo avançado de simulação cinesiológica e física mecânica em 3D. Reproduz fielmente a cinemática de um Hack Machine a 45°, calculando ângulos articulares, controle de amplitude de curso, posicionamento dinâmico de anilhas olímpicas, travas de segurança e gráficos de telemetria de tensão muscular e força exercida em tempo real.",
      status: "DEVELOPMENT",
      project_type: "WEB",
      featured: false,
      published: true,
      live_url: null,
      repository_url: "https://github.com/Chiqueto/digital-twin",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/digital-twin-biomecanica.png",
      sort_order: 5,
      techs: ["Three.js", "React Three Fiber", "Next.js", "Typescript"]
    },
    {
      title: "Papo Torto - Party Game",
      slug: "papo-torto",
      short_description: "Party game multiplayer de blefe e dedução social para 4 a 10 amigos com WebSockets em tempo real e arquitetura com Redis.",
      description: "Party game online com temática de investigação cômica onde os jogadores precisam descobrir quem é o mentiroso no grupo. Construído com Next.js e TypeScript, o jogo sincroniza estados de partida, mural privado, depoimentos e votações instantaneamente utilizando WebSocket e Redis para mensageria distribuída de baixa latência, além de banco de dados relacional PostgreSQL (Neon).",
      status: "DEVELOPMENT",
      project_type: "WEB",
      featured: false,
      published: true,
      live_url: "https://papo-torto.vercel.app",
      repository_url: "https://github.com/Chiqueto/Papo_Torto",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/papo-torto.png",
      sort_order: 6,
      techs: ["Next.js", "Typescript", "WebSocket", "PostgreSQL", "Redis", "TailwindCSS"]
    },
    {
      title: "Class Line - Backend",
      slug: "class-line-backend",
      short_description: "API corporativa completa em Java 21 e Spring Boot 3 para gerenciamento de instituições escolares com JWT e Swagger.",
      description: "Solução robusta voltada para a gestão acadêmica e administrativa de instituições de ensino. O backend gerencia o ciclo completo de alunos, corpo docente, cursos, turmas e matrículas, contando com autenticação stateless baseada em JWT, testes, documentação interativa com Swagger/OpenAPI e contêiner Docker para orquestração simplificada.",
      status: "PRODUCTION",
      project_type: "BACKEND",
      featured: false,
      published: true,
      live_url: "https://classline-backend.onrender.com/swagger-ui/index.html",
      repository_url: "https://github.com/Chiqueto/ClassLine-Backend",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/class-line-backend.svg",
      sort_order: 7,
      techs: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Swagger"]
    },
    {
      title: "Gestão de Benefícios & Agente IA",
      slug: "gestao-de-beneficios",
      short_description: "Sistema corporativo em Spring Boot para controle de benefícios e agendamentos médicos integrado a um agente de IA conversacional.",
      description: "Projeto de TCC do curso técnico no SENAI Franca com foco na modernização de processos de Recursos Humanos. Permite a solicitação, tramitação e auditoria de benefícios corporativos, além de agendamento de consultas médicas com médicos do trabalho. Destaca-se pela integração de um agente de inteligência artificial em linguagem natural que atua como assistente virtual dos colaboradores.",
      status: "ACADEMIC",
      project_type: "BACKEND",
      featured: false,
      published: true,
      live_url: null,
      repository_url: "https://github.com/Chiqueto/Senai-TCC---Backend-GB",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/gestao-de-beneficios.png",
      sort_order: 8,
      techs: ["Java", "Spring Boot", "PostgreSQL", "Docker"]
    },
    {
      title: "Pokédex Interativa",
      slug: "pokedex",
      short_description: "Aplicação frontend responsiva em React e TypeScript para exploração detalhada de Pokémon por gerações e atributos.",
      description: "Aplicação desenvolvida para demonstrar proficiência em consumo de APIs REST, roteamento dinâmico e interface moderna. Permite filtrar criaturas por gerações, pesquisar por atributos e visualizar status base, fraquezas e sprites animados de forma instantânea.",
      status: "PRODUCTION",
      project_type: "WEB",
      featured: false,
      published: true,
      live_url: "https://pokedex-git-v2-luis-felipe-mozer-chiquetos-projects.vercel.app/",
      repository_url: "https://github.com/Chiqueto/pokedex",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/pokedex.png",
      sort_order: 9,
      techs: ["React", "Typescript", "TailwindCSS"]
    },
    {
      title: "GTA Zombie 3D Game",
      slug: "gta-zombie-3d",
      short_description: "Jogo 3D de ação e sobrevivência em terceira pessoa desenvolvido em Unity com veículos, combate e IA de zumbis.",
      description: "Projeto desenvolvido no Uni-FACEF aplicando fundamentos de computação gráfica e física de jogos na Unity 3D. O jogador explora uma cidade aberta a pé ou dirigindo veículos, enfrenta hordas de zumbis com perseguição inteligente e combate dinâmico, além de contar com ciclo de iluminação dinâmico.",
      status: "ACADEMIC",
      project_type: "OTHER",
      featured: false,
      published: true,
      live_url: null,
      repository_url: "https://github.com/Chiqueto/GTA-Zombie-3d-Game",
      cover_image_url: "https://pamosyiiddwdjggdbkiq.supabase.co/storage/v1/object/public/portfolio/projects/covers/gta-zombie.png",
      sort_order: 10,
      techs: ["C#", "Unity 3D"]
    },
    {
      title: "QuadraFácil - Reserva de Quadras",
      slug: "quadrafacil",
      short_description: "Sistema de reservas de quadras esportivas com foco em Engenharia de Segurança, modelagem STRIDE e autenticação server-side.",
      description: "Desenvolvido como projeto de Engenharia de Segurança de Software na faculdade. O foco primordial é a mitigação de vulnerabilidades (OWASP / STRIDE), implementando autenticação e autorização robustas, hashes seguros de senha com bcrypt, validação com Zod e sessões opacas com tokens SHA-256 no PostgreSQL via Drizzle ORM.",
      status: "DEVELOPMENT",
      project_type: "WEB",
      featured: false,
      published: false,
      live_url: null,
      repository_url: "https://github.com/Chiqueto/quadras-app-Eng.Seg",
      cover_image_url: null,
      sort_order: 11,
      techs: ["Next.js", "Typescript", "PostgreSQL", "TailwindCSS"]
    }
  ];

  for (const item of projectsData) {
    const { techs: projectTechs, ...projectFields } = item;

    const { data: savedProject, error: projError } = await supabase
      .from('projects')
      .upsert(projectFields as any, { onConflict: 'slug' })
      .select('id')
      .single();

    if (projError) {
      console.error(`Erro ao salvar projeto ${projectFields.title}:`, projError.message);
      continue;
    }

    if (projectTechs && projectTechs.length > 0) {
      await supabase.from('project_technologies').delete().eq('project_id', savedProject.id);

      const links = projectTechs
        .map(tName => {
          const techId = techMap.get(tName.toLowerCase()) || techMap.get(slugify(tName));
          return techId ? { project_id: savedProject.id, technology_id: techId } : null;
        })
        .filter((l): l is { project_id: string; technology_id: string } => l !== null);

      if (links.length > 0) {
        await supabase.from('project_technologies').insert(links as any);
      }
    }
  }
  console.log("Projects ok");

  console.log("Seed concluído!");
}

seed();
