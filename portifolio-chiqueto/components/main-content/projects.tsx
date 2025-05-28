import ProjectCard from "../project-card";

const Projects = () => {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl">Projetos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6 ">
                <ProjectCard imgUrl="/backend-card.png" alt="Plann.er" title="Plann.er" githubLink="https://github.com/Chiqueto/Plann.er" linkedinLink="https://www.linkedin.com/posts/luis-felipe-chiqueto_reactjs-tailwind-rocketseat-activity-7217001306375208960-30aI?utm_source=share&utm_medium=member_desktop" />

                <ProjectCard imgUrl="/backend-card.png" alt="To do List" title="To do List" githubLink="https://github.com/Chiqueto/ToDo" linkedinLink="https://www.linkedin.com/posts/luis-felipe-chiqueto_nodejs-express-mongodb-activity-7239307696338800640-95C-?utm_source=share&utm_medium=member_desktop" />

                <ProjectCard imgUrl="/backend-card.png" alt="VirtuaFab" title="VirtuaFab" linkedinLink="https://www.linkedin.com/posts/renan-de-oliveira-silva-416721289_inovaaexaeto-senaigrandprix-realidadeaumentada-ugcPost-7261727290282156032-TzKi?utm_source=share&utm_medium=member_desktop" />

                <ProjectCard imgUrl="/backend-card.png" alt="Pokedex" title="Pokedex" githubLink="https://github.com/Chiqueto/pokedex" linkTo="https://pokedex-git-v2-luis-felipe-mozer-chiquetos-projects.vercel.app/" />

                <ProjectCard imgUrl="/backend-card.png" alt="GameVerseR" title="GameVerseR" githubLink="https://github.com/Chiqueto/GameVerser" />

                <ProjectCard imgUrl="/backend-card.png" alt="Pokedex Mobile" title="Pokedex Mobile" githubLink="https://github.com/Chiqueto/pokedex-mobile" />

                <ProjectCard imgUrl="/backend-card.png" alt="Chat WebSocket" title="Chat WebSocket" githubLink="https://github.com/Chiqueto/Chat---WebSocket/tree/v3" linkTo="https://chat-websocket-x9bh.onrender.com/" />



            </div>
        </section>);
}

export default Projects;