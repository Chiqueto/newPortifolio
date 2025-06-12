import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa6";

interface ProjectCardProps {
    imgUrl: string;
    alt: string;
    title: string;
    linkTo?: string;
    githubLink?: string;
    linkedinLink?: string;

}

const ProjectCard = ({ alt, imgUrl, title, githubLink, linkTo, linkedinLink }: ProjectCardProps) => {
    return (
        <Card>
            <CardContent className="space-y-3">
                <div className="relative w-full h-52 rounded-2xl border-2 border-foreground">
                    <Image alt={alt} src={imgUrl} fill className="object-cover rounded-xl" />
                </div>
                <h3 className="font-bold font-body text-lg">{title}</h3>
                <div className="flex items-center gap-2 text-sm">
                    <Link href={linkTo ? linkTo : "#"} target="_blank" className="flex gap-3 justify-center align-text-bottom">{linkTo && < FaLink size={24} />}
                        <h4>{linkTo ? "Clique para acessar!" : "Não há link de acesso..."}</h4>
                    </Link>
                </div>
                <div className="flex items-center justify-end gap-2 text-sm">
                    {githubLink && <Link href={githubLink} target="_blank"><FaGithub size={24} /></Link>}
                    {linkedinLink && <Link href={linkedinLink} target="_blank"><FaLinkedin size={24} /></Link>}
                </div>



            </CardContent>
        </Card>
    );
}

export default ProjectCard;