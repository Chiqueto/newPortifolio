import { Card } from "../ui/card";
import Image from "next/image";
const Home = () => {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl">Sobre Mim</h2>
            <p className="text-sm my-2">
                <strong>🎓 Estudante de Engenharia de Software na UNIFACEF - Franca</strong>, com formação técnica em Desenvolvimento de Sistemas e experiência prática em desenvolvimento full stack. Atualmente, atuo como Jovem Aprendiz na Usina Alta Mogiana, onde contribuo para o desenvolvimento de sistemas, além de ter iniciado minha trajetória como estagiário na ACEDATA em São Joaquim da Barra.<br /><br />

                💡 Minha paixão pela tecnologia vai além da teoria. Ao longo da minha jornada, tive a oportunidade de desenvolver projetos de forma prática, incluindo o <strong>GymFit</strong>, uma aplicação voltada para o gerenciamento de atividades físicas, onde me aprofundei em <strong>backend com Express</strong>. Além disso, realizei trabalhos freelance, criando páginas e aprimorando minhas habilidades de front-end.<br /><br />

                🚀 No meu dia a dia, trabalho com tecnologias como <strong>React, Express, PostgreSQL, MongoDB e Java com Spring Boot</strong>, sempre buscando aprender e me aprimorar, além de estar expandindo meu conhecimento em <strong>React Native e Flutter</strong>, explorando o desenvolvimento mobile e criando interfaces modernas e responsivas. Embora ainda esteja construindo minha base em algumas dessas tecnologias, a prática constante e a <strong>vontade de aprender</strong> me permitem evoluir rapidamente.<br /><br />

                🤝 Como profissional, <strong>valorizo o trabalho em equipe</strong>, pois acredito que a troca de ideias e a colaboração são essenciais para o sucesso de qualquer projeto. <strong>Meu objetivo é crescer como Desenvolvedor Full Stack</strong>, combinando habilidades de front-end e back-end para criar soluções robustas e eficientes.<br /><br />
            </p>
            <h2 className="font-body font-bold text-xl">O quê eu faço</h2>
            <div>
                <Card className="flex flex-row p-0 m-0 bg-amber-700">
                    <div className="flex flex-row gap-2 bg-card/95">
                        <div className="relative min-h-[179px] min-w-[116px] max-w-[116px] mx-auto flex items-start justify-start ">

                            <Image
                                src={"/frontend.png"}
                                fill
                                className="object-cover rounded-l-lg"
                                alt={"Luís Felipe Mozer Chiqueto"} />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <h3 className="font-inter font-bold text-base mt-1">
                                Desenvolvimento Front-end</h3>
                            <p className="text-sm text-card-foreground/60">With a robust proficiency in
                                React.js. I excel at transforming design concepts into dynamic, user-friendly websites.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>);
}

export default Home;