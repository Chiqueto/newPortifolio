"use client";

import { useTab } from "@/hooks/useTab";

const SPECS = [
  {
    label: "Backend Engineering",
    items: ["Java 21", "Spring Boot", "REST / Security", "SQL / Oracle"],
  },
  {
    label: "Web Development",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Wear OS", "FCM"],
  },
  {
    label: "Sistemas",
    items: ["Delphi", "Oracle", "PostgreSQL", "Docker"],
  },
];

export default function Overview({ profile }: { profile?: any }) {
  const { setSelectedTab } = useTab();

  return (
    <div className="space-y-12 max-w-2xl">
      {/* Headline principal */}
      <div className="space-y-3">
        <p className="font-mono text-xs text-gold uppercase tracking-[0.25em]">
          Software Developer
        </p>
        <div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground leading-[1.05] tracking-tight uppercase">
            Luís
          </h2>
          <h2 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight uppercase">
            <span className="text-gold">Felipe</span>
          </h2>
          <h2 className="text-5xl md:text-6xl font-black text-muted-foreground leading-[1.05] tracking-tight uppercase">
            Chiqueto
          </h2>
        </div>

        <p className="text-base text-muted-foreground max-w-md leading-relaxed mt-4 pt-1">
          {profile?.bio ||
            "Engenheiro Full Stack com foco em backend, sistemas corporativos e mobile. Produtos em produção, código que funciona."}
        </p>
      </div>

      {/* Stack linha */}
      <div className="flex flex-wrap gap-2">
        {["Java / Spring Boot", "React / Next.js", "React Native / Wear OS"].map(
          (s) => (
            <span
              key={s}
              className="font-mono text-xs px-3 py-1.5 rounded border border-gold/40 text-gold bg-gold-muted"
            >
              {s}
            </span>
          )
        )}
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button
          onClick={() => setSelectedTab("projects")}
          className="px-5 py-2.5 rounded border border-gold bg-gold text-background font-bold text-sm hover:bg-gold/90 transition-colors"
        >
          Ver Projetos
        </button>
        <button
          onClick={() => setSelectedTab("contact")}
          className="px-5 py-2.5 rounded border border-border text-muted-foreground text-sm hover:text-foreground hover:border-gold/50 transition-colors"
        >
          Entrar em contato
        </button>
      </div>

      {/* Divisor */}
      <div className="border-t border-border" />

      {/* Especializações */}
      <div>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-6">
          Especialidades
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SPECS.map((spec) => (
            <div key={spec.label} className="space-y-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider border-b border-border pb-2">
                {spec.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {spec.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded border border-border text-muted-foreground bg-surface hover:border-gold/40 hover:text-foreground transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formação discreta */}
      {profile?.location && (
        <p className="font-mono text-xs text-muted-foreground">
          📍 {profile.location}
        </p>
      )}
    </div>
  );
}
