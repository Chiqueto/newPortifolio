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
      <div className="space-y-4">
        <p className="font-mono text-sm text-gold uppercase tracking-[0.2em] font-medium">
          Software Developer
        </p>
        <div className="space-y-1">
          <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight uppercase">
            Luís <span className="text-gold">Felipe</span> Chiqueto
          </h2>
        </div>

        <div className="pt-2">
          <p className="text-lg md:text-xl text-foreground/90 max-w-xl leading-relaxed font-medium">
            {profile?.bio ||
              "Engenheiro Full Stack com foco em backend, sistemas corporativos e mobile. Produtos em produção, código que funciona."}
          </p>
        </div>
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
        <p className="font-mono text-sm text-foreground/80 uppercase tracking-wider mb-6 font-semibold">
          Especialidades
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SPECS.map((spec) => (
            <div key={spec.label} className="space-y-3">
              <p className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-2">
                {spec.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {spec.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1.5 rounded border border-border text-foreground/80 font-medium bg-surface hover:border-gold/60 hover:text-foreground transition-colors"
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
