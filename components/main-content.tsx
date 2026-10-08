"use client";

import { useTab } from "@/hooks/useTab";
import Overview from "./sections/overview";
import Projects from "./sections/projects";
import Experience from "./sections/experience";
import Capabilities from "./sections/capabilities";
import Contact from "./sections/contact";

const SECTION_LABELS: Record<string, { index: string; label: string }> = {
  home:       { index: "01", label: "Sobre" },
  projects:   { index: "02", label: "Projetos" },
  experience: { index: "03", label: "Experiência" },
  skills:     { index: "04", label: "Stack" },
  contact:    { index: "05", label: "Contato" },
};

export default function MainContent({
  projects,
  experiences,
  education,
  technologies,
  profile,
}: {
  projects: any[];
  experiences: any[];
  education: any[];
  technologies: any[];
  profile?: any;
}) {
  const { selectedTab } = useTab();
  const meta = SECTION_LABELS[selectedTab] || SECTION_LABELS.home;

  return (
    <div className="min-h-full flex flex-col">
      {/* Header interno da seção */}
      <header className="sticky top-0 z-10 flex items-center gap-3 px-8 py-4 bg-background/95 backdrop-blur border-b border-border">
        <span className="font-mono text-xs text-gold">{meta.index}</span>
        <div className="h-3.5 w-px bg-border" />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          {meta.label}
        </span>
      </header>

      {/* Conteúdo da seção */}
      <div className="flex-1 px-6 md:px-10 py-8 max-w-5xl w-full mx-auto">
        {selectedTab === "home"       && <Overview profile={profile} />}
        {selectedTab === "projects"   && <Projects projects={projects} />}
        {selectedTab === "experience" && <Experience experiences={experiences} education={education} />}
        {selectedTab === "skills"     && <Capabilities technologies={technologies} />}
        {selectedTab === "contact"    && <Contact profile={profile} />}
      </div>
    </div>
  );
}