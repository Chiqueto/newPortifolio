import EducationCard from "../education-card";
import ProfessionalExperienceCard from "../professional-experience-card";

export default function Experience({ experiences, education }: { experiences: any[], education: any[] }) {
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "Atualmente";
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '');
    }

    return (
        <section className="text-left ">
            <article>
                <h2 className="font-body font-bold text-xl">Educação</h2>
                <div className="grid grid-cols-1 gap-4 my-2 lg:grid-cols-2">
                    {education.map(edu => (
                        <EducationCard 
                            key={edu.id}
                            duration={`${formatDate(edu.start_date)} - ${formatDate(edu.end_date)}`} 
                            formation={edu.degree} 
                            institution={edu.institution} 
                        />
                    ))}
                </div>
                {education.length === 0 && <p className="text-muted-foreground text-sm">Nenhuma formação cadastrada.</p>}
            </article>
            <article className="mt-4">
                <h2 className="font-body font-bold text-xl">Experiência Profissional</h2>
                <div className="grid grid-cols-1 gap-4 my-2">
                    {experiences.map(exp => (
                        <ProfessionalExperienceCard 
                            key={exp.id}
                            img_url={exp.company_logo_url || "/placeholder-company.png"} 
                            duration={`${formatDate(exp.start_date)} - ${formatDate(exp.end_date)}`} 
                            company={exp.company_name} 
                            role={exp.role} 
                            description={exp.description} 
                        />
                    ))}
                </div>
                {experiences.length === 0 && <p className="text-muted-foreground text-sm">Nenhuma experiência cadastrada.</p>}
            </article>
        </section>
    )
}