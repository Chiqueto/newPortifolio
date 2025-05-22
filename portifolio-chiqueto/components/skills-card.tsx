import { Card } from "./ui/card";
import { ElementType } from "react";

interface SkillsCardProps {
    name: string;
    icon: ElementType;
    color: string;
}

const SkillsCard = ({ name, icon: Icon, color }: SkillsCardProps) => {
    return (
        <div className="flex flex-col gap-1 text-center w-24 h-28">
            <Card className="p-2 text-center mx-auto shadow-[0_0_8px_2px] hover:shadow-[0_0_8px_4px] shadow-primary">
                <Icon size={40} className={color} />

            </Card><h4 className="font-mono text-base font-medium w-full break-words">{name}</h4>
        </div>
    )

}

export default SkillsCard;