import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa6";

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
                <div className="flex items-center gap-2 text-sm">
                    <Link href={"#"}>< FaLink size={24} /></Link>
                    <h4>Clique para acessar!</h4>
                </div>
                <div className="flex items-center justify-end gap-2 text-sm">
                    <Link href={"#"}><FaGithub size={24} /></Link>
                    <Link href={"#"}>< FaLinkedin size={24} /></Link>
                </div>



            </CardContent>
        </Card>
    );
}

export default ProjectCard;