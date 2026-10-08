"use client";

import React from "react";
import { motion, useInView } from "motion/react";
import { 
  Server, 
  Layout, 
  Smartphone, 
  Database, 
  Wrench, 
  Sparkles,
  Cpu
} from "lucide-react";

interface CapabilitiesSceneProps {
  technologies: any[];
}

export function CapabilitiesScene({ technologies = [] }: CapabilitiesSceneProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Categorize technologies
  const backendTech = technologies.filter(
    (t) => t.category?.toUpperCase() === "BACKEND"
  );
  const frontendTech = technologies.filter(
    (t) => t.category?.toUpperCase() === "FRONTEND"
  );
  const mobileTech = technologies.filter(
    (t) => t.category?.toUpperCase() === "MOBILE"
  );
  const dbTech = technologies.filter(
    (t) => t.category?.toUpperCase() === "DATABASE"
  );
  const toolsTech = technologies.filter(
    (t) => t.category?.toUpperCase() === "TOOLS" || t.category?.toUpperCase() === "DESIGN"
  );

  const DOMAIN_GROUPS = [
    {
      title: "Backend & Arquitetura",
      subtitle: "APIs robustas, microsserviços e regras de negócio",
      icon: Server,
      items: backendTech.length > 0 ? backendTech : [
        { name: "Java" },
        { name: "Spring Boot" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "Delphi" },
      ],
      color: "#F59879",
    },
    {
      title: "Frontend & Aplicações Web",
      subtitle: "Interfaces dinâmicas, SSR e alta performance",
      icon: Layout,
      items: frontendTech.length > 0 ? frontendTech : [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "TailwindCSS" },
      ],
      color: "#F9E6C1",
    },
    {
      title: "Mobile & Wear OS",
      subtitle: "Aplicações nativas, notificações e vestíveis",
      icon: Smartphone,
      items: mobileTech.length > 0 ? mobileTech : [
        { name: "React Native" },
        { name: "Expo" },
        { name: "Wear OS" },
        { name: "Mobile UI" },
      ],
      color: "#D65F67",
    },
    {
      title: "Bancos de Dados & SQL",
      subtitle: "Modelagem relacional, otimização e persistência",
      icon: Database,
      items: dbTech.length > 0 ? dbTech : [
        { name: "PostgreSQL" },
        { name: "Oracle DB" },
        { name: "SQL Server" },
        { name: "MongoDB" },
      ],
      color: "#F59879",
    },
    {
      title: "Ferramentas & Integrações",
      subtitle: "Controle de versão, APIs REST e prototipação",
      icon: Wrench,
      items: toolsTech.length > 0 ? toolsTech : [
        { name: "Git" },
        { name: "GitHub" },
        { name: "Postman" },
        { name: "Insomnia" },
        { name: "Swagger" },
        { name: "Figma" },
      ],
      color: "#F9E6C1",
    },
    {
      title: "IA & Ecossistema Moderno",
      subtitle: "Integração de LLMs, pagamentos e automação",
      icon: Sparkles,
      items: [
        { name: "OpenAI / Gemini APIs" },
        { name: "Supabase" },
        { name: "Asaas / Stripe" },
        { name: "Push Notifications" },
      ],
      color: "#D65F67",
    },
  ];

  return (
    <section 
      id="scene-technologies" 
      ref={ref}
      className="relative min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-24"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        
        {/* ── Scene Header ── */}
        <div className="pb-4 border-b border-[#F59879]/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-[#F59879] font-bold px-2.5 py-0.5 rounded-full bg-[#4A1739]/80 border border-[#F59879]/40">
              05
            </span>
            <span className="font-mono text-xs text-[#F9E6C1]/75 uppercase tracking-widest font-semibold">
              Stack & Habilidades
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Tecnologias & Ferramentas
          </h2>
          <p className="text-sm text-[#F9E6C1]/80 max-w-xl mt-1">
            Linguagens, frameworks e ecossistema aplicado na construção de produtos de alta confiabilidade.
          </p>
        </div>

        {/* ── Integrated Domain Panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAIN_GROUPS.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#290625] to-[#1C031A] border border-[#F59879]/30 hover:border-[#F59879] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_12px_35px_rgba(20,2,19,0.3)] hover:-translate-y-1"
              >
                <div>
                  {/* Module Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="p-3 rounded-2xl bg-[#22051F] border border-[#F59879]/30 group-hover:scale-110 transition-transform duration-300"
                      style={{ color: group.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <Cpu className="w-4 h-4 text-[#F59879]/40" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#F9E6C1] transition-colors">
                    {group.title}
                  </h3>
                  <p className="text-xs text-[#F9E6C1]/70 mt-1 line-clamp-2">
                    {group.subtitle}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-[#F59879]/15 mt-6">
                  {group.items.map((tech: any) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1.5 rounded-xl bg-[#22051F]/90 text-[#F9E6C1] hover:text-white hover:bg-[#4A1739] text-xs font-mono border border-[#F59879]/20 transition-all hover:scale-105 cursor-default"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
