import WhatIDoCard from "../what-i-do-card";
const Home = () => {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl">Sobre Mim</h2>
            <p className="text-sm my-2">
                <strong>🎓 Estudante de Engenharia de Software na UNIFACEF - Franca</strong>, com formação técnica em Desenvolvimento de Sistemas e experiência prática em desenvolvimento full stack. Atualmente, atuo como Jovem Aprendiz na Usina Alta Mogiana, onde contribuo para o desenvolvimento de sistemas, além de ter iniciado minha trajetória como estagiário na ACEDATA em São Joaquim da Barra.<br /><br />

                💡 Minha paixão pela tecnologia vai além da teoria. Ao longo da minha jornada, tive a oportunidade de desenvolver projetos de forma prática, incluindo o <strong>Classline</strong>, uma aplicação voltada para o gerenciamento de instituições de ensino, onde me aprofundei em <strong>backend com Java Spring Boot</strong>. Além disso, realizei trabalhos freelance, criando páginas e aprimorando minhas habilidades de front-end.<br /><br />

                🚀 No meu dia a dia, trabalho com tecnologias como <strong>React, Express, PostgreSQL, MongoDB e Java com Spring Boot</strong>, sempre buscando aprender e me aprimorar, além de estar expandindo meu conhecimento em <strong>React Native e Flutter</strong>, explorando o desenvolvimento mobile e criando interfaces modernas e responsivas. Embora ainda esteja construindo minha base em algumas dessas tecnologias, a prática constante e a <strong>vontade de aprender</strong> me permitem evoluir rapidamente.<br /><br />

                🤝 Como profissional, <strong>valorizo o trabalho em equipe</strong>, pois acredito que a troca de ideias e a colaboração são essenciais para o sucesso de qualquer projeto. <strong>Meu objetivo é crescer como Desenvolvedor Full Stack</strong>, combinando habilidades de front-end e back-end para criar soluções robustas e eficientes.<br /><br />
            </p>
            <h2 className="font-body font-bold text-xl">O quê eu faço</h2>
            <div className="my-2 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <WhatIDoCard title="💻 Web Front-End Development" description="Com foco em React.js, desenvolvo interfaces dinâmicas, responsivas e voltadas para a experiência do usuário. Transformo ideias em interfaces modernas e funcionais, com atenção a performance e usabilidade." image="/frontend-card.png" />
                <WhatIDoCard title="⚙️ Back-End Development" description="Tenho experiência prática com Node.js, Express.js e Java (Spring Boot) para criação de APIs e sistemas robustos. Utilizo PostgreSQL e MongoDB para estruturar e gerenciar dados de forma eficiente em aplicações reais." image="/backend-card.png" />
                <WhatIDoCard title="📱 Mobile App Development" description="Estou iniciando no desenvolvimento mobile com React Native e explorando Flutter. Busco construir aplicações multiplataforma com foco em performance, integração com backend e uma ótima experiência de uso." image="/mobile-card.png" />
                <WhatIDoCard title="🧠 UI/UX Designing" description="Ainda em aprendizado, estou desenvolvendo meu olhar para UI/UX, buscando criar interfaces intuitivas e visualmente agradáveis, sempre focando na melhor experiência para o usuário final." image="/UiUx-card.png" />
            </div>
        </section>);
}

export default Home;