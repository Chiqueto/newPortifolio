function formatYear(dateStr: string | null): string {
  if (!dateStr) return "Atual";
  return new Date(dateStr).getFullYear().toString();
}

function formatMonthYear(dateStr: string | null): string {
  if (!dateStr) return "Atual";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { month: "short", year: "numeric" }).replace(".", "");
}

export default function Experience({
  experiences,
  education,
}: {
  experiences: any[];
  education: any[];
}) {
  return (
    <div className="space-y-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em]">03 / Experiência</p>

      {/* Professional */}
      <div className="space-y-8">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Profissional
        </p>

        {experiences.length === 0 && (
          <p className="text-muted-foreground text-sm">Nenhuma experiência cadastrada.</p>
        )}

        <div className="space-y-8">
          {experiences.map((exp) => {
            const startYear = formatYear(exp.start_date);
            const endYear = exp.end_date ? formatYear(exp.end_date) : "Atual";
            const period = `${formatMonthYear(exp.start_date)} – ${formatMonthYear(exp.end_date)}`;

            return (
              <div key={exp.id} className="flex gap-6">
                {/* Year column */}
                <div className="shrink-0 w-14 text-right">
                  <span className="font-mono text-xs text-gold leading-none">
                    {startYear === endYear ? startYear : `${startYear}–${endYear}`}
                  </span>
                </div>

                {/* Divider */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-px bg-border flex-1 mt-1" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 my-1" />
                  <div className="w-px bg-border flex-1" />
                </div>

                {/* Content */}
                <div className="pb-8 space-y-1.5 flex-1">
                  <p className="text-base font-semibold text-foreground">{exp.company_name || ""}</p>
                  <p className="text-sm text-muted-foreground">{exp.role || ""}</p>
                  <p className="font-mono text-xs text-border">{period}</p>
                  {exp.description && (
                    <p className="text-sm text-muted-foreground/80 leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Education */}
      <div className="space-y-8">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Educação
        </p>

        {education.length === 0 && (
          <p className="text-muted-foreground text-sm">Nenhuma formação cadastrada.</p>
        )}

        <div className="space-y-6">
          {education.map((edu) => {
            const startYear = formatYear(edu.start_date);
            const endYear = edu.end_date ? formatYear(edu.end_date) : "Atual";

            return (
              <div key={edu.id} className="flex gap-6">
                {/* Year column */}
                <div className="shrink-0 w-14 text-right">
                  <span className="font-mono text-xs text-muted-foreground leading-none">
                    {startYear}–{endYear}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-medium text-foreground">{edu.degree || ""}</p>
                  <p className="text-xs text-muted-foreground">{edu.institution || ""}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
