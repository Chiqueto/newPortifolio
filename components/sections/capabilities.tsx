import { DiGit, DiGithubBadge, DiJavascript, DiReact } from "react-icons/di";
import {
  SiExpress, SiInsomnia, SiMongodb, SiPostman,
  SiSpringboot, SiSwagger, SiTypescript, SiDelphi, SiDocker,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandReactNative, TbSql } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";
import { PiFigmaLogoFill } from "react-icons/pi";
import { BsAndroid2 } from "react-icons/bs";

const iconMap: Record<string, { icon: any; color: string }> = {
  react: { icon: DiReact, color: "text-cyan-400" },
  javascript: { icon: DiJavascript, color: "text-yellow-400" },
  typescript: { icon: SiTypescript, color: "text-blue-400" },
  "node.js": { icon: FaNodeJs, color: "text-green-500" },
  nodejs: { icon: FaNodeJs, color: "text-green-500" },
  express: { icon: SiExpress, color: "text-foreground" },
  "next.js": { icon: RiNextjsFill, color: "text-foreground" },
  nextjs: { icon: RiNextjsFill, color: "text-foreground" },
  tailwindcss: { icon: RiTailwindCssFill, color: "text-cyan-400" },
  tailwind: { icon: RiTailwindCssFill, color: "text-cyan-400" },
  mongodb: { icon: SiMongodb, color: "text-green-500" },
  postgresql: { icon: BiLogoPostgresql, color: "text-blue-400" },
  "sql server": { icon: TbSql, color: "text-blue-400" },
  sqlserver: { icon: TbSql, color: "text-blue-400" },
  java: { icon: FaJava, color: "text-red-400" },
  "spring boot": { icon: SiSpringboot, color: "text-green-500" },
  springboot: { icon: SiSpringboot, color: "text-green-500" },
  "react native": { icon: TbBrandReactNative, color: "text-cyan-400" },
  reactnative: { icon: TbBrandReactNative, color: "text-cyan-400" },
  "wear os": { icon: BsAndroid2, color: "text-green-400" },
  wearos: { icon: BsAndroid2, color: "text-green-400" },
  figma: { icon: PiFigmaLogoFill, color: "text-foreground" },
  git: { icon: DiGit, color: "text-orange-400" },
  github: { icon: DiGithubBadge, color: "text-foreground" },
  postman: { icon: SiPostman, color: "text-orange-400" },
  insomnia: { icon: SiInsomnia, color: "text-purple-400" },
  swagger: { icon: SiSwagger, color: "text-green-500" },
  docker: { icon: SiDocker, color: "text-blue-400" },
  delphi: { icon: SiDelphi, color: "text-red-400" },
};

export default function Capabilities({ technologies }: { technologies: any[] }) {
  const categories = technologies.reduce((acc: any, tech: any) => {
    const cat = tech.category || "Geral";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tech);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-10">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em]">04 / Capacidades</p>

      {technologies.length === 0 && (
        <p className="text-muted-foreground text-sm">Nenhuma tecnologia cadastrada.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
        {Object.keys(categories).map((catName) => (
          <div key={catName} className="space-y-3">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-2">
              {catName}
            </p>
            <ul className="space-y-2.5">
              {categories[catName].map((tech: any) => {
                const key = tech.slug?.toLowerCase() || tech.name?.toLowerCase() || "";
                const mapped = iconMap[key];
                const Icon = mapped?.icon;

                return (
                  <li key={tech.id} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                    {Icon ? (
                      <Icon className={`text-base shrink-0 ${mapped.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                    ) : tech.icon_url ? (
                      <img src={tech.icon_url} alt={tech.name || ""} className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="w-4 h-4 shrink-0 rounded text-[9px] font-bold bg-surface text-gold flex items-center justify-center">
                        {(tech.name || "?").charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="text-sm font-medium">{tech.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
