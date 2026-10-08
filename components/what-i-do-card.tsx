import { Card } from "./ui/card"
import Image from "next/image";

interface WhatIDoCardProps {
    title: string;
    description: string;
    image: string;
}

const WhatIDoCard = ({ title, description, image }: WhatIDoCardProps) => {
    return (
        <Card className="flex flex-row p-0 m-0 bg-fifth">
            <div className="flex flex-row gap-2">
                <div className="relative min-h-[179px] min-w-[116px] max-w-[116px] mx-auto flex items-start justify-start">

                    <Image
                        src={image}
                        fill
                        className="object-bottom-left rounded-l-lg"
                        alt={"Luís Felipe Mozer Chiqueto"} />
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <h3 className="font-inter font-bold text-base mt-1">{title}</h3>
                    <p className="text-xs lg:text-sm text-card-foreground/60">{description}</p>
                </div>
            </div>
        </Card>
    )
}

export default WhatIDoCard;