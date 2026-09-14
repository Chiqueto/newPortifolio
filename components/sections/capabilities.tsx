import { DiGit, DiGithubBadge, DiJavascript, DiReact } from "react-icons/di";
import { SiExpress, SiInsomnia, SiMongodb, SiPostman, SiSpringboot, SiSwagger, SiTypescript, SiDelphi, SiDocker, SiOracle } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandReactNative, TbSql } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";
import { PiFigmaLogoFill } from "react-icons/pi";
import { BsAndroid2 } from "react-icons/bs";

const iconMap: Record<string, { icon: any; color: string }> = {
  react:          { icon: DiReact,            color: "text-cyan-400" },
  javascript:     { icon: DiJavascript,       color: "text-yellow-400" },
  typescript:     { icon: SiTypescript,       color: "text-blue-400" },
  "node.js":      { icon: FaNodeJs,           color: "text-green-500" },
  nodejs:         { icon: FaNodeJs,           color: "text-green-500" },
  express:        { icon: SiExpress,          color: "text-foreground" },
  "next.js":      { icon: RiNextjsFill,       color: "text-foreground" },
  nextjs:         { icon: RiNextjsFill,       color: "text-foreground" },
  tailwindcss:    { icon: RiTailwindCssFill,  color: "text-cyan-400" },
  tailwind:       { icon: RiTailwindCssFill,  color: "text-cyan-400" },
  mongodb:        { icon: SiMongodb,          color: "text-green-500" },
  postgresql:     { icon: BiLogoPostgresql,   color: "text-blue-400" },
  "sql server":   { icon: TbSql,             color: "text-blue-400" },
  sqlserver:      { icon: TbSql,             color: "text-blue-400" },
  oracle:         { icon: SiOracle,           color: "text-red-400" },
  java:           { icon: FaJava,             color: "text-orange-400" },
  "spring boot":  { icon: SiSpringboot,       color: "text-green-500" },
  springboot:     { icon: SiSpringboot,       color: "text-green-500" },
  "react native": { icon: TbBrandReactNative, color: "text-cyan-400" },
  reactnative:    { icon: TbBrandReactNative, color: "text-cyan-400" },
  "wear os":      { icon: BsAndroid2,         color: "text-green-400" },
  wearos:         { icon: BsAndroid2,         color: "text-green-400" },
  figma:          { icon: PiFigmaLogoFill,    color: "text-pink-400" },
  git:            { icon: DiGit,              color: "text-orange-500" },
  github:         { icon: DiGithubBadge,      color: "text-foreground" },
  postman:        { icon: SiPostman,          color: "text-orange-400" },
  insomnia:       { icon: SiInsomnia,         color: "text-purple-400" },
  swagger:        { icon: SiSwagger,          color: "text-green-500" },
  docker:         { icon: SiDocker,           color: "text-blue-400" },
  delphi:         { icon: SiDelphi,           color: "text-red-400" },
};

export default function Capabilities({ technologies }: { technologies: any[] }) {
  const categories = technologies.reduce((acc: Record<string, any[]>, tech: any) => {
    const cat = tech.category || "Geral";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tech);
    return acc;
  }, {});

  if (technologies.length === 0) {
    return <p className="text-muted-foreground text-sm">Nenhuma tecnologia cadastrada.</p>;
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(categories).map((catName) => (
          <div key={catName} className="rounded border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-surface">
              <p className="font-mono text-xs text-gold uppercase tracking-wider">{catName}</p>
            </div>

            {/* Chips */}
            <div className="px-4 py-4 flex flex-wrap gap-2">
              {categories[catName].map((tech: any) => {
                const key = tech.slug?.toLowerCase() || tech.name?.toLowerCase() || "";
                const mapped = iconMap[key];
                const Icon = mapped?.icon;

                return (
                  <div
                    key={tech.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-surface hover:border-gold/40 hover:bg-gold-muted transition-all group"
                  >
                    {Icon ? (
                      <Icon className={`text-base shrink-0 ${mapped.color} opacity-80 group-hover:opacity-100`} />
                    ) : tech.icon_url ? (
                      <img src={tech.icon_url} alt={tech.name || ""} className="w-4 h-4 object-contain opacity-70" />
                    ) : (
                      <span className="w-4 h-4 flex items-center justify-center text-[9px] font-bold text-gold bg-gold-muted rounded">
                        {(tech.name || "?").charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
