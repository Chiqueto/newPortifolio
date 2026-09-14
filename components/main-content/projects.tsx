import ProjectCard from "../project-card";

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl">Projetos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6 ">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
            {projects.length === 0 && (
                <p className="text-muted-foreground mt-4">Nenhum projeto cadastrado.</p>
            )}
        </section>
    );
}