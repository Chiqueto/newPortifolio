function formatPeriod(start: string | null, end: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }).replace(".", "");
  const s = start ? fmt(start) : "—";
  const e = end ? fmt(end) : "Atual";
  return `${s} — ${e}`;
}

function formatYear(d: string | null): string {
  if (!d) return "Atual";
  return new Date(d).getFullYear().toString();
}

export default function Experience({
  experiences,
  education,
}: {
  experiences: any[];
  education: any[];
}) {
  return (
    <div className="space-y-12 max-w-3xl">
      {/* Experiência Profissional */}
      <div className="space-y-4">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          Experiência Profissional
        </p>

        {experiences.length === 0 && (
          <p className="text-muted-foreground text-sm">Nenhuma experiência cadastrada.</p>
        )}

        <div className="space-y-4">
          {experiences.map((exp) => {
            const startYear = formatYear(exp.start_date);
            const endYear = exp.end_date ? formatYear(exp.end_date) : "ATUAL";
            const period = formatPeriod(exp.start_date, exp.end_date);

            const stack: string[] = exp.tech_stack
              ? Array.isArray(exp.tech_stack)
                ? exp.tech_stack
                : String(exp.tech_stack).split(",").map((s: string) => s.trim())
              : [];

            return (
              <div
                key={exp.id}
                className="rounded border border-border bg-card overflow-hidden hover:border-gold/30 transition-colors"
              >
                {/* Header do painel */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface">
                  <span className="font-mono text-xs text-gold font-bold">
                    {startYear} — {endYear}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    {period}
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 py-4 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {exp.company_name || ""}
                    </h3>
                    <p className="text-sm text-gold/80 font-medium">{exp.role || ""}</p>
                  </div>

                  {exp.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
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
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Formação */}
      <div className="space-y-4">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          Educação
        </p>

        {education.length === 0 && (
          <p className="text-muted-foreground text-sm">Nenhuma formação cadastrada.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {education.map((edu) => {
            const s = formatYear(edu.start_date);
            const e = edu.end_date ? formatYear(edu.end_date) : "Atual";

            return (
              <div
                key={edu.id}
                className="rounded border border-border bg-card px-4 py-3 space-y-1 hover:border-gold/30 transition-colors"
              >
                <p className="font-mono text-[10px] text-muted-foreground">{s} — {e}</p>
                <p className="text-sm font-semibold text-foreground">{edu.degree || ""}</p>
                <p className="text-xs text-muted-foreground">{edu.institution || ""}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
