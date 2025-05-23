import ProjectCard from "../project-card";

const Projects = () => {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl">Projetos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6 ">
                <ProjectCard imgUrl="/backend-card.png" alt="projeto" title="Projeto backend"/>

            </div>
        </section>);
}

export default Projects;