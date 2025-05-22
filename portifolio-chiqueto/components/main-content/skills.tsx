import SkillsCard from "../skills-card";

const Skills = () => {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl">Skills</h2>
            <div className="flex flex-row gap-4">
                <SkillsCard />
                <SkillsCard />
                <SkillsCard />
                <SkillsCard />
                <SkillsCard />
                <SkillsCard />
                <SkillsCard />
                <SkillsCard />

            </div>
        </section>
    )
}

export default Skills;