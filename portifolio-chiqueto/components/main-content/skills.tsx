import { DiGit, DiGithubBadge, DiJavascript, DiReact } from "react-icons/di";
import SkillsCard from "../skills-card";
import { SiExpress, SiInsomnia, SiMongodb, SiPostman, SiSpringboot, SiSwagger, SiTypescript } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandReactNative, TbSql } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";
import { PiFigmaLogoFill } from "react-icons/pi";

const Skills = () => {
    return (
        <section className="text-left space-y-6">
            <h2 className="font-body font-bold text-xl">Skills</h2>
            <div className="grid grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4 my-2 place-items-center">
                <SkillsCard name="React" icon={DiReact} color="text-cyan-500" />
                <SkillsCard name="Javascript" icon={DiJavascript} color="text-yellow-500" />
                <SkillsCard name="Typescript" icon={SiTypescript} color="text-cyan-500" />
                <SkillsCard name="Node.Js" icon={FaNodeJs} color="text-lime-500" />
                <SkillsCard name="Express" icon={SiExpress} color="text-lime-500" />
                <SkillsCard name="Next.js" icon={RiNextjsFill} color="text-foreground" />
                <SkillsCard name="TailwindCSS" icon={RiTailwindCssFill} color="text-cyan-500" />
                <SkillsCard name="MongoDB" icon={SiMongodb} color="text-lime-500" />
                <SkillsCard name="PostgreSQL" icon={BiLogoPostgresql} color="text-blue-400" />
                <SkillsCard name="Sql Server" icon={TbSql} color="text-blue-400" />
                <SkillsCard name="Java" icon={FaJava} color="text-red-400" />
                <SkillsCard name="Spring Boot" icon={SiSpringboot} color="text-lime-500" />
                <SkillsCard name="React Native" icon={TbBrandReactNative} color="text-cyan-500" />
            </div>
            <h2 className="font-body font-bold text-xl">Ferramentas & Softwares</h2>
            <div className="grid grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4 my-2 place-items-center">
                <SkillsCard name="Figma" icon={PiFigmaLogoFill} color="text-foreground" />
                <SkillsCard name="Git" icon={DiGit} color="text-red-500" />
                <SkillsCard name="Github" icon={DiGithubBadge} color="text-foreground" />
                {/* <SkillsCard name="Github Actions" icon={SiGithubactions} color="text-blue-500" /> */}
                <SkillsCard name="Postman" icon={SiPostman} color="text-orange-500" />
                <SkillsCard name="Insomnia" icon={SiInsomnia} color="text-purple-500" />
                <SkillsCard name="Swagger" icon={SiSwagger} color="text-lime-500" />
            </div>
        </section>
    )
}

export default Skills;