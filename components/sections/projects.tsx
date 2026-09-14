"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa6";

function ProjectCard({ project, index, featured }: { project: any; index: number; featured?: boolean }) {
  const num = String(index + 1).padStart(2, "0");

  const stack: string[] = project.tech_stack
    ? Array.isArray(project.tech_stack)
      ? project.tech_stack
      : String(project.tech_stack).split(",").map((s: string) => s.trim())
    : [];

  const statusLabel = project.status
    ? project.status.replace(/_/g, " ").toUpperCase()
    : null;

  return (
    <div className={`
      rounded border border-border bg-card hover:border-gold/40 transition-all duration-200 group overflow-hidden
      ${featured ? "col-span-1 md:col-span-2" : "col-span-1"}
    `}>
      {/* Header do card */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold">{num}</span>
          <div className="h-3 w-px bg-border" />
          {statusLabel && (
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {statusLabel}
            </span>
          )}
        </div>
        {project.project_type && (
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            {project.project_type}
          </span>
        )}
      </div>

      {/* Body */}
      <div className={`${featured ? "md:flex" : ""}`}>
        {/* Imagem */}
        {project.cover_image_url && (
          <div className={`relative overflow-hidden bg-surface ${featured ? "md:w-2/5 aspect-video md:aspect-auto" : "aspect-video"}`}>
            <Image
              src={project.cover_image_url}
              alt={project.title || ""}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes={featured ? "40vw" : "400px"}
            />
          </div>
        )}

        {/* Info */}
        <div className={`p-5 flex flex-col gap-4 ${featured && project.cover_image_url ? "md:flex-1" : "flex-1"}`}>
          <div className="space-y-1.5">
            <h3 className={`font-black text-foreground uppercase tracking-tight leading-tight ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
              {project.title}
            </h3>
            {project.short_description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.short_description}
              </p>
            )}
          </div>

          {/* Stack chips */}
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {stack.map((t: string) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2 py-0.5 rounded border border-border text-muted-foreground bg-surface"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-auto pt-2">
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded border border-gold/50 text-gold text-xs font-mono hover:bg-gold-muted transition-colors"
            >
              Ver Case <FaArrowRight size={10} />
            </Link>
            {project.repository_url && (
              <Link
                href={project.repository_url}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub size={13} /> Código
              </Link>
            )}
            {project.live_url && (
              <Link
                href={project.live_url}
                target="_blank"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                Demo ↗
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: any[] }) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">Nenhum projeto cadastrado.</p>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl">
      {featured.length > 0 && (
        <div className="space-y-4">
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Trabalhos em Destaque
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} featured={i === 0} />
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div className="space-y-4">
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Outros Projetos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {others.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={featured.length + i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
