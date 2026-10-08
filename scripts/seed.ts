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
    avatar_url: "/profile_pic_cartoon.png"
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

  for (const ed of educations) {
    const { error } = await supabase.from('education').upsert(ed as any, { onConflict: 'institution,course', ignoreDuplicates: true }); // We'll just insert if there is an error on upsert without unique
    if (error) console.error("Erro ed:", error);
  }
  // To make education idempotent easily since it doesn't have a unique natural key, we will delete all and insert
  await supabase.from('education').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: edError } = await supabase.from('education').insert(educations);
  if (edError) console.error("Erro education:", edError);
  else console.log("Education ok");

  // 3. Experiences
  const experiences = [
    { company: "ACEDATA Software", role: "Programador Estagiário", start_date: "2023-03-01", end_date: "2023-12-31", description: "Como estagiário, fui responsável por desenvolver correções e melhorias no sistema ERP da empresa, tanto em ambientes Windows quanto Web. Para isso, aprendi a utilizar Genexus, a principal tecnologia empregada no desenvolvimento das soluções. Durante essa experiência, não apenas refinei minha lógica de programação, mas também adquiri habilidades essenciais de trabalho em equipe, aplicando a metodologia ágil SCRUM.", company_logo_url: "/Acedata.png", sort_order: 2 },
    { company: "Usina Alta Mogiana", role: "Aprendiz de Desenvolvimento de Sistemas", start_date: "2024-01-01", current: true, description: "Como jovem aprendiz, participei do curso técnico de Desenvolvimento de Sistemas promovido pelo SENAI, além de ser integrado às atividades de T.I. na usina. Essas atividades incluíram desenvolvimento de sistemas, manutenção de sistemas embarcados, suporte à infraestrutura, automação industrial e inovação tecnológica. Essas experiências me permitiram expandir minha visão e conhecimento sobre tecnologia e suas diversas aplicações nas áreas operacionais da usina.", company_logo_url: "/AltaMogiana2.png", sort_order: 1 }
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
    { name: "Swagger", category: "TOOLS" }
  ].map((t, i) => ({ ...t, slug: slugify(t.name), sort_order: i }));

  const { error: techError } = await supabase.from('technologies').upsert(techs, { onConflict: 'slug' });
  if (techError) console.error("Erro technologies:", techError);
  else console.log("Technologies ok");

  // 5. Projects
  const projectsData = [
    { title: "Plann.er", cover_image_url: "/plann.er.png", repository_url: "https://github.com/Chiqueto/Plann.er", status: "PRODUCTION", project_type: "WEB" },
    { title: "To do List", cover_image_url: "/todolist.png", repository_url: "https://github.com/Chiqueto/ToDo", status: "PRODUCTION", project_type: "WEB" },
    { title: "VirtuaFab", cover_image_url: "/virtuafab.png", status: "ACADEMIC", project_type: "OTHER" },
    { title: "Pokedex", cover_image_url: "/capa_pokedex.png", repository_url: "https://github.com/Chiqueto/pokedex", live_url: "https://pokedex-git-v2-luis-felipe-mozer-chiquetos-projects.vercel.app/", status: "PRODUCTION", project_type: "WEB" },
    { title: "GameVerseR", cover_image_url: "/capa_gameverser.png", repository_url: "https://github.com/Chiqueto/GameVerser", status: "PRODUCTION", project_type: "WEB" },
    { title: "Pokedex Mobile", cover_image_url: "/capa_pokedex_mobile.png", repository_url: "https://github.com/Chiqueto/pokedex-mobile", status: "PRODUCTION", project_type: "MOBILE" },
    { title: "Chat WebSocket", cover_image_url: "/chat_websocket.png", repository_url: "https://github.com/Chiqueto/Chat---WebSocket/tree/v3", live_url: "https://chat-websocket-x9bh.onrender.com/", status: "PRODUCTION", project_type: "WEB" },
    { title: "FSW Barber", cover_image_url: "/fsw.png", repository_url: "https://github.com/Chiqueto/fsw-barber", status: "PRODUCTION", project_type: "WEB" },
    { title: "Doutor Agenda", cover_image_url: "/doutor_agenda.png", repository_url: "https://github.com/Chiqueto/doutor-agenda", status: "PRODUCTION", project_type: "WEB" },
    { title: "Class Line - Backend", cover_image_url: "/LOGIN-ADMIN.svg", repository_url: "https://github.com/Chiqueto/ClassLine-Backend", live_url: "https://classline-backend.onrender.com/swagger-ui/index.html", status: "PRODUCTION", project_type: "BACKEND" }
  ].map((p, i) => ({ ...p, slug: slugify(p.title), sort_order: i, published: true }));

  const { error: projError } = await supabase.from('projects').upsert(projectsData, { onConflict: 'slug' });
  if (projError) console.error("Erro projects:", projError);
  else console.log("Projects ok");

  console.log("Seed concluído!");
}

seed();
