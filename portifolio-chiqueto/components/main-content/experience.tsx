import EducationCard from "../education-card";
import ProfessionalExperienceCard from "../professional-experience-card";

const Experience = () => {
    return (
        <section className="text-left ">
            <article>
                <h2 className="font-body font-bold text-xl">Educação</h2>
                <div className="grid grid-cols-1 gap-4 my-2 lg:grid-cols-2">
                    <EducationCard duration="2021 - 2022" formation="Formação Técnica em Desenvolvimento de Sistemas" institution="ETEC - Pedro Badran" key={1} />
                    <EducationCard duration="2023 - 2026" formation="Bacharelado - Engenharia de Software" institution="UNIFACEF - Franca" key={2} />
                    <EducationCard duration="2024 - 2025" formation="Formação Técnica em Desenvolvimento de Sistemas" institution="SENAI - Franca" key={3} />
                </div>
            </article>
            <article className="mt-4">
                <h2 className="font-body font-bold text-xl">Experiência Profissional</h2>
                <div className="grid grid-cols-1 gap-4 my-2">
                    <ProfessionalExperienceCard img_url="/Acedata.png" duration="Mar 2023 - Dez 2023" company="ACEDATA Software" role="Programador Estagiários" description="Como estagiário, fui responsável por desenvolver correções e melhorias no sistema ERP da empresa, tanto em ambientes Windows quanto Web. Para isso, aprendi a utilizar Genexus, a principal tecnologia empregada no desenvolvimento das soluções. Durante essa experiência, não apenas refinei minha lógica de programação, mas também adquiri habilidades essenciais de trabalho em equipe, aplicando a metodologia ágil SCRUM." key={1} />
                    <ProfessionalExperienceCard img_url="/AltaMogiana2.png" duration="Jan 2024 - Atualmente" company="Usina Alta Mogiana" role="Aprendiz de Desenvolvimento de Sistemas" description="Como jovem aprendiz, participei do curso técnico de Desenvolvimento de Sistemas promovido pelo SENAI, além de ser integrado às atividades de T.I. na usina. Essas atividades incluíram desenvolvimento de sistemas, manutenção de sistemas embarcados, suporte à infraestrutura, automação industrial e inovação tecnológica. Essas experiências me permitiram expandir minha visão e conhecimento sobre tecnologia e suas diversas aplicações nas áreas operacionais da usina." key={2} />
                </div>
            </article>
        </section>
    )
}

export default Experience;