import { Card } from "./ui/card";

export interface AboutMeCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const AboutMeCard = ({ title, description, icon }: AboutMeCardProps) => {
    return (
        <Card className="p-3 md:p-4 text-center mx-auto shadow-primary transition-shadow w-full min-h-[240px] flex flex-col">
            <div className="flex flex-row items-start justify-start gap-2 mb-2 md:mb-3">
                <div className="shrink-0">
                    {icon}
                </div>
                <h1 className="text-primary text-xs md:text-sm lg:text-base font-head flex-1 text-left md:text-center leading-tight">{title}</h1>
            </div>
            <p className="font-normal text-left text-[10px] md:text-xs lg:text-sm leading-relaxed flex-1">{description}</p>
        </Card>
    );
}

export default AboutMeCard;