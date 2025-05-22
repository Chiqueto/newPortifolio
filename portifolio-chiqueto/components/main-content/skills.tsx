import { DiJavascript, DiReact } from "react-icons/di";
import SkillsCard from "../skills-card";
import { SiExpress, SiMongodb, SiSpringboot, SiTypescript } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandReactNative, TbSql } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";

const Skills = () => {
    return (
        <section className="text-left">
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
        </section>
    )
}

export default Skills;