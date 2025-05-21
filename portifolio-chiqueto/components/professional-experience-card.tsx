import Image from "next/image";
import { Card } from "./ui/card";

interface ProfessionalExperienceCardProps {
    company: string;
    role: string;
    duration: string;
    description: string;
    img_url: string
}


const ProfessionalExperienceCard = ({ company, role, duration, img_url/*description*/ }: ProfessionalExperienceCardProps) => {
    return (
        <Card className="p-4 flex flex-col md:flex-row gap-4 items-center ">
            < div className="relative max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px] mx-auto flex items-center justify-center flex-1" >
                <Image
                    src={img_url}
                    fill
                    className="rounded-lg object-contain border-2 border-solid border-card-border"
                    alt={"Luís Felipe Mozer Chiqueto"}
                />
            </div >
            <p className="flex-1">
                <strong>Empresa:</strong> {company}<br />
                <strong>Papel:</strong> {role}<br />
                <strong>Duração:</strong> {duration}
            </p>
            {/* <p className="flex-1">
                <strong>Descrição: </strong>
                <span className="text-sm">{description}</span>
            </p> */}
        </Card>
    )
}

export default ProfessionalExperienceCard;