import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
    project: any;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const imgUrl = project.cover_image_url || "/plann.er.png";
    const title = project.title;
    const linkTo = project.live_url;
    const githubLink = project.repository_url;
    const status = project.status;
    const projectType = project.project_type;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer">
                    <Card className="hover:scale-105 transition-transform duration-200 ease-in-out hover:shadow-lg hover:shadow-primary/30 h-full">
                        <CardContent className="space-y-3 pt-6 flex flex-col h-full">
                            <div className="relative w-full h-52 rounded-2xl border-2 border-foreground flex-shrink-0">
                                <Image alt={title} src={imgUrl} fill className="object-cover rounded-xl" />
                            </div>
                            <h3 className="font-bold font-body text-lg">{title}</h3>
                            <div className="flex-1">
                                {project.short_description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {project.short_description}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-2xl bg-card border-card-border">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-body">{title}</DialogTitle>
                    <div className="flex gap-2 mt-2">
                        {status && <Badge variant="secondary">{status.replace('_', ' ')}</Badge>}
                        {projectType && <Badge variant="outline">{projectType}</Badge>}
                    </div>
                </DialogHeader>
                
                <div className="relative w-full h-64 rounded-2xl border-2 border-foreground mt-4">
                    <Image alt={title} src={imgUrl} fill className="object-cover rounded-xl" />
                </div>

                <div className="space-y-4 mt-4">
                    {project.description && (
                        <div className="text-sm whitespace-pre-wrap">
                            {project.description}
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-6">
                        {linkTo && (
                            <Link href={linkTo} target="_blank" className="flex items-center gap-2 text-primary hover:underline">
                                <FaLink size={20} />
                                <span>Acessar Projeto</span>
                            </Link>
                        )}
                        {githubLink && (
                            <Link href={githubLink} target="_blank" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <FaGithub size={20} />
                                <span>Repositório</span>
                            </Link>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProjectCard;