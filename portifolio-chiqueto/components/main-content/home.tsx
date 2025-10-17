import { GraduationCap, Handshake, Lightbulb, Rocket } from "lucide-react";
import AboutMeCard from "../AboutMeCard";
import WhatIDoCard from "../what-i-do-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
const Home = () => {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl mb-4">Sobre Mim</h2>
            <Carousel
                opts={{
                    align: "center",
                    loop: true,
                    containScroll: "trimSnaps",
                }}
                className="max-w-[90%] mx-auto"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    <CarouselItem className="pl-2 md:pl-4 basis-[85%] md:basis-[60%] lg:basis-[45%]">
                        <AboutMeCard
                            title="Minha Jornada Acadêmica e Profissional"
                            description="Estudante de Engenharia de Software na UNIFACEF - Franca, com formação técnica em Desenvolvimento de Sistemas e experiência prática em desenvolvimento full stack. Atualmente, atuo como Jovem Aprendiz na Usina Alta Mogiana, onde contribuo para o desenvolvimento de sistemas, além de ter iniciado minha trajetória como estagiário na ACEDATA em São Joaquim da Barra."
                            icon={<GraduationCap className="text-primary" size={48} />}
                        />
                    </CarouselItem>
                    <CarouselItem className="pl-2 md:pl-4 basis-[85%] md:basis-[60%] lg:basis-[45%]">
                        <AboutMeCard
                            title="Projetos e Freelance - Minha Experiência"
                            description="Minha paixão pela tecnologia vai além da teoria. Ao longo da minha jornada, tive a oportunidade de desenvolver projetos de forma prática, incluindo o Classline, uma aplicação voltada para o gerenciamento de instituições de ensino, onde me aprofundei em backend com Java Spring Boot. Além disso, realizei trabalhos freelance, criando páginas e sistemas, assim aprimorando minhas habilidades de Full Stack."
                            icon={<Lightbulb className="text-primary" size={48} />}
                        />
                    </CarouselItem>
                    <CarouselItem className="pl-2 md:pl-4 basis-[85%] md:basis-[60%] lg:basis-[45%]">
                        <AboutMeCard
                            title="Explorando e Dominando Tecnologias"
                            description="No meu dia a dia, trabalho com tecnologias como React, Express, PostgreSQL, MongoDB e Java com Spring Boot, sempre buscando aprender e me aprimorar, além de estar expandindo meu conhecimento em React Native e Flutter, explorando o desenvolvimento mobile e criando interfaces modernas e responsivas. Embora ainda esteja construindo minha base em algumas dessas tecnologias, a prática constante e a vontade de aprender me permitem evoluir rapidamente."
                            icon={<Rocket className="text-primary" size={48} />}
                        />
                    </CarouselItem>
                    <CarouselItem className="pl-2 md:pl-4 basis-[85%] md:basis-[60%] lg:basis-[45%]">
                        <AboutMeCard
                            title="Colaboração e crescimento Full Stack"
                            description="Como profissional, valorizo o trabalho em equipe, pois acredito que a troca de ideias e a colaboração são essenciais para o sucesso de qualquer projeto. Meu objetivo é crescer como Desenvolvedor Full Stack, combinando habilidades de front-end e back-end para criar soluções robustas e eficientes."
                            icon={<Handshake className="text-primary" size={48} />}
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
            <h2 className="font-body font-bold text-xl mt-2">O quê eu faço</h2>
            <div className="my-2 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <WhatIDoCard title="💻 Web Front-End Development" description="Com foco em React.js, desenvolvo interfaces dinâmicas, responsivas e voltadas para a experiência do usuário. Transformo ideias em interfaces modernas e funcionais, com atenção a performance e usabilidade." image="/front-end.png" />
                <WhatIDoCard title="⚙️ Back-End Development" description="Tenho experiência prática com Node.js, Express.js e Java (Spring Boot) para criação de APIs e sistemas robustos. Utilizo PostgreSQL e MongoDB para estruturar e gerenciar dados de forma eficiente em aplicações reais." image="/backend.png" />
                <WhatIDoCard title="📱 Mobile App Development" description="Estou iniciando no desenvolvimento mobile com React Native e explorando Flutter. Busco construir aplicações multiplataforma com foco em performance, integração com backend e uma ótima experiência de uso." image="/mobile.png" />
                <WhatIDoCard title="🧠 UI/UX Designing" description="Ainda em aprendizado, estou desenvolvendo meu olhar para UI/UX, buscando criar interfaces intuitivas e visualmente agradáveis, sempre focando na melhor experiência para o usuário final." image="/design.png" />
            </div>
        </section>);
}

export default Home;