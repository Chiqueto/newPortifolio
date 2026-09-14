import SkillsCard from "../skills-card";
import { DiGit, DiGithubBadge, DiJavascript, DiReact } from "react-icons/di";
import { SiExpress, SiInsomnia, SiMongodb, SiPostman, SiSpringboot, SiSwagger, SiTypescript } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandReactNative, TbSql } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";
import { PiFigmaLogoFill } from "react-icons/pi";

const iconMap: Record<string, { icon: any, color: string }> = {
    react: { icon: DiReact, color: "text-cyan-500" },
    javascript: { icon: DiJavascript, color: "text-yellow-500" },
    typescript: { icon: SiTypescript, color: "text-cyan-500" },
    "node.js": { icon: FaNodeJs, color: "text-lime-500" },
    nodejs: { icon: FaNodeJs, color: "text-lime-500" },
    express: { icon: SiExpress, color: "text-lime-500" },
    "next.js": { icon: RiNextjsFill, color: "text-foreground" },
    nextjs: { icon: RiNextjsFill, color: "text-foreground" },
    tailwindcss: { icon: RiTailwindCssFill, color: "text-cyan-500" },
    tailwind: { icon: RiTailwindCssFill, color: "text-cyan-500" },
    mongodb: { icon: SiMongodb, color: "text-lime-500" },
    postgresql: { icon: BiLogoPostgresql, color: "text-blue-400" },
    "sql server": { icon: TbSql, color: "text-blue-400" },
    sqlserver: { icon: TbSql, color: "text-blue-400" },
    java: { icon: FaJava, color: "text-red-400" },
    "spring boot": { icon: SiSpringboot, color: "text-lime-500" },
    springboot: { icon: SiSpringboot, color: "text-lime-500" },
    "react native": { icon: TbBrandReactNative, color: "text-cyan-500" },
    reactnative: { icon: TbBrandReactNative, color: "text-cyan-500" },
    figma: { icon: PiFigmaLogoFill, color: "text-foreground" },
    git: { icon: DiGit, color: "text-red-500" },
    github: { icon: DiGithubBadge, color: "text-foreground" },
    postman: { icon: SiPostman, color: "text-orange-500" },
    insomnia: { icon: SiInsomnia, color: "text-purple-500" },
    swagger: { icon: SiSwagger, color: "text-lime-500" },
};

export default function Skills({ technologies }: { technologies: any[] }) {
    // Organizar por categoria (se não houver categoria, vai para "Geral")
    const categories = technologies.reduce((acc: any, tech: any) => {
        const cat = tech.category || "Skills";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(tech);
        return acc;
    }, {});

    return (
        <section className="text-left space-y-6">
            {Object.keys(categories).map((catName) => (
                <div key={catName}>
                    <h2 className="font-body font-bold text-xl">{catName}</h2>
                    <div className="grid grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4 my-2 place-items-center">
                        {categories[catName].map((tech: any) => {
                            const mapKey = tech.slug?.toLowerCase() || tech.name?.toLowerCase();
                            const mapped = iconMap[mapKey];
                            
                            return (
                                <SkillsCard 
                                    key={tech.id} 
                                    name={tech.name} 
                                    iconUrl={tech.icon_url || undefined} 
                                    icon={mapped?.icon}
                                    color={mapped?.color}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
            {technologies.length === 0 && (
                <p className="text-muted-foreground mt-4">Nenhuma tecnologia cadastrada.</p>
            )}
        </section>
    )
}