import { Card } from "./ui/card";
import { ElementType } from "react";
import Image from "next/image";

interface SkillsCardProps {
    name: string;
    icon?: ElementType;
    iconUrl?: string;
    color?: string;
}

const SkillsCard = ({ name, icon: Icon, iconUrl, color }: SkillsCardProps) => {
    return (
        <div className="flex flex-col gap-1 text-center w-24 h-28">
            <Card className="p-2 flex items-center justify-center text-center mx-auto shadow-[0_0_8px_2px] hover:shadow-[0_0_8px_4px] shadow-primary w-14 h-14">
                {iconUrl ? (
                    <img src={iconUrl} alt={name} className="w-10 h-10 object-contain" />
                ) : Icon ? (
                    <Icon size={40} className={color} />
                ) : (
                    <span className="font-bold text-lg">{name.charAt(0)}</span>
                )}
            </Card>
            <h4 className="font-mono text-base font-medium w-full break-words">{name}</h4>
        </div>
    )

}

export default SkillsCard;