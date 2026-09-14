"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

function ProjectRow({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const num = String(index + 1).padStart(2, "0");
  const type = [project.project_type, project.status]
    .filter(Boolean)
    .join(" / ");
  const year = project.created_at
    ? new Date(project.created_at).getFullYear()
    : "";

  return (
    <li
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`flex items-start gap-4 py-5 border-b border-border transition-colors ${
          hovered ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {/* Index */}
        <span className={`font-mono text-xs shrink-0 pt-0.5 transition-colors ${hovered ? "text-gold" : "text-border"}`}>
          {num}
        </span>

        {/* Info */}
        <div className="flex-1 space-y-1">
          <p className={`text-base font-semibold transition-colors ${hovered ? "text-foreground" : "text-foreground/80"}`}>
            {project.title}
          </p>
          {type && (
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              {type}
            </p>
          )}
          {project.short_description && (
            <p className={`text-sm leading-relaxed transition-colors ${hovered ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
              {project.short_description}
            </p>
          )}
        </div>

        {/* Year + arrow */}
        <div className="flex items-center gap-3 shrink-0">
          {year && <span className="font-mono text-xs text-muted-foreground">{year}</span>}
          <FaArrowRight
            size={12}
            className={`transition-all duration-200 ${hovered ? "text-gold translate-x-0.5" : "text-border"}`}
          />
        </div>
      </Link>

      {/* Hover preview image */}
      {hovered && project.cover_image_url && (
        <div className="hidden lg:block absolute right-[-240px] top-1/2 -translate-y-1/2 z-10 w-[220px] aspect-video rounded border border-border overflow-hidden shadow-xl pointer-events-none">
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            className="object-cover"
            sizes="220px"
          />
        </div>
      )}
    </li>
  );
}

export default function Projects({ projects }: { projects: any[] }) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-10">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em]">02 / Projetos</p>

      {projects.length === 0 && (
        <p className="text-muted-foreground text-sm">Nenhum projeto cadastrado.</p>
      )}

      {featured.length > 0 && (
        <div>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
            Selected Work
          </p>
          <ul>
            {featured.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={i} />
            ))}
          </ul>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
            Other Projects
          </p>
          <ul>
            {others.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={featured.length + i} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
