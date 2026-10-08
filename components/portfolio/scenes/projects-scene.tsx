"use client";

import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  Layers, 
  Smartphone, 
  Globe, 
  Server,
  FolderGit2
} from "lucide-react";

interface ProjectsSceneProps {
  projects: any[];
}

const DEFAULT_SLUG_IMAGES: Record<string, string> = {
  "plann-er": "/plann.er.png",
  "doutor-agenda": "/doutor_agenda.png",
  "fsw-barber": "/fsw.png",
  "virtuafab": "/virtuafab.png",
  "gameverser": "/capa_gameverser.png",
  "pokedex": "/capa_pokedex.png",
  "pokedex-mobile": "/capa_pokedex_mobile.png",
  "chat-websocket": "/chat_websocket.png",
  "to-do-list": "/todolist.png",
};

export function ProjectsScene({ projects = [] }: ProjectsSceneProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const categories = [
    { label: "Todos", value: "ALL" },
    { label: "Web", value: "WEB" },
    { label: "Mobile", value: "MOBILE" },
    { label: "Backend", value: "BACKEND" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    return p.project_type?.toUpperCase() === filter;
  });

  return (
    <section 
      id="scene-projects" 
      ref={ref}
      className="relative min-h-screen px-3 sm:px-6 md:px-12 py-12 sm:py-24"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8 sm:space-y-10">
        
        {/* ── Scene Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-4 border-b border-[#F59879]/20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#F59879] font-bold px-2.5 py-0.5 rounded-full bg-[#4A1739]/80 border border-[#F59879]/40">
                03
              </span>
              <span className="font-mono text-xs text-[#F9E6C1]/75 uppercase tracking-widest font-semibold">
                Projetos & Estudos de Caso
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Projetos em Destaque
            </h2>
            <p className="text-xs sm:text-sm text-[#F9E6C1]/80 max-w-xl mt-1">
              Aplicações web, mobile e sistemas completos desenvolvidos com foco em performance e regras de negócio reais.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#22051F]/80 border border-[#F59879]/30 backdrop-blur-md self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  filter === cat.value
                    ? "bg-[#F59879] text-[#22051F] font-bold shadow-md"
                    : "text-[#F9E6C1]/70 hover:text-white hover:bg-[#4A1739]/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects Grid as Scenic Portals / Framed Viewports ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const imageSrc =
              project.thumbnail_url ||
              project.cover_image_url ||
              DEFAULT_SLUG_IMAGES[project.slug];

            const stack = project.tech_stack
              ? Array.isArray(project.tech_stack)
                ? project.tech_stack
                : String(project.tech_stack).split(",").map((s: string) => s.trim())
              : [];

            return (
              <motion.article
                key={project.id || project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#2A0625] to-[#1C031A] border border-[#F59879]/30 hover:border-[#F59879] transition-all duration-300 overflow-hidden shadow-[0_15px_40px_rgba(20,2,19,0.35)] flex flex-col justify-between"
              >
                {/* ── Viewport Header Bar ── */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F59879]/20 bg-[#22051F]/70">
                  <div className="flex items-center gap-2">
                    {project.project_type?.toUpperCase() === "MOBILE" ? (
                      <Smartphone className="w-3.5 h-3.5 text-[#F59879]" />
                    ) : project.project_type?.toUpperCase() === "BACKEND" ? (
                      <Server className="w-3.5 h-3.5 text-[#F59879]" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-[#F59879]" />
                    )}
                    <span className="font-mono text-[11px] text-[#F9E6C1]/80 uppercase tracking-wider">
                      {project.project_type || "APP"}
                    </span>
                  </div>

                  {project.status && (
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#4A1739] text-[#F59879] border border-[#F59879]/30">
                      {project.status.replace(/_/g, " ")}
                    </span>
                  )}
                </div>

                {/* ── Illustrated Visual Window / Image ── */}
                <div className="relative aspect-[16/10] w-full bg-[#32072C] overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* Typographic Scenic Graphic fallback */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#4A1739] via-[#350A30] to-[#22051F]">
                      <FolderGit2 className="w-12 h-12 text-[#F59879]/60 mb-2" />
                      <span className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                        {project.title}
                      </span>
                      <span className="text-xs text-[#F9E6C1]/70 font-mono mt-1">
                        Estudo de Caso & Arquitetura
                      </span>
                    </div>
                  )}

                  {/* Gradient shadow overlay for smooth transition */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1C031A] to-transparent pointer-events-none" />
                </div>

                {/* ── Content & Tech Badges ── */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#F9E6C1] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F9E6C1]/80 line-clamp-2 leading-relaxed">
                      {project.short_description ||
                        "Aplicação desenvolvida com foco em arquitetura escalável e experiência do usuário."}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  {stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stack.slice(0, 5).map((tech: string) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-[#22051F]/90 text-[#F9E6C1]/90 border border-[#F59879]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F59879]/20">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F59879] hover:text-[#F9E6C1] transition-colors"
                    >
                      <span>Ver Estudo de Caso</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.repository_url && (
                        <a
                          href={project.repository_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Repositório do ${project.title}`}
                          className="p-2 rounded-xl bg-[#22051F] hover:bg-[#4A1739] text-[#F9E6C1] border border-[#F59879]/20 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Acessar demo de ${project.title}`}
                          className="p-2 rounded-xl bg-[#22051F] hover:bg-[#4A1739] text-[#F9E6C1] border border-[#F59879]/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
