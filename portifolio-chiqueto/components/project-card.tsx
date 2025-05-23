import Image from "next/image";
import { Card, CardContent } from "./ui/card";

interface ProjectCardProps {
    imgUrl: string;
    alt: string;
    title: string;
}

const ProjectCard = ({ alt, imgUrl, title }: ProjectCardProps) => {
    return (
        <Card>
            <CardContent className="space-y-3">
                <div className="relative w-full h-52 rounded-2xl border-2 border-foreground">
                    <Image alt={alt} src={imgUrl} fill className="object-cover rounded-xl" />
                </div>
                <h3 className="font-bold font-body text-lg">{title}</h3>

            </CardContent>
        </Card>
    );
}

export default ProjectCard;