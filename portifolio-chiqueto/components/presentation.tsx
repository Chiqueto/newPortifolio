import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, GithubIcon, Instagram, LinkedinIcon, Mail, MapPin, Smartphone } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Presentation = () => {
    return (<section className="mt-36 max-w-sm ">
        <Card className="flex flex-col items-center justify-center px-2">
            <div className="relative max-h-[200px] min-h-[200px] min-w-[200px] max-w-[200px] mx-auto flex items-center justify-center mt-[-80px]">
                <Image
                    src={"/profile_pic_cartoon.png"}
                    fill
                    className="rounded-lg object-cover border-4 border-solid border-card-border"
                    alt={"Luís Felipe Mozer Chiqueto"}
                />
            </div>
            <h1 className="text-2xl font-inter font-bold">Luís Felipe Mozer Chiqueto</h1>
            <Badge variant={"secondary"} className="p-2 border border-solid border-card-border font-inter text-base">
                Web | Mobile Developer
            </Badge>
            <div className="flex flex-row gap-2 items-center justify-center">

                <Link href={"https://www.instagram.com/lfchiqueto?igsh=MXhxcWV3c2U1Nm9meg=="} target="_blank">
                    <Instagram size={32} className="p-1 border-2 border-solid border-[#E77975] rounded-sm text-[#E77975] cursor-pointer" />
                </Link>

                <Link href={"https://www.linkedin.com/in/luis-felipe-chiqueto/"} target="_blank">
                    <LinkedinIcon size={32} className="p-1 border-2 border-solid border-[#3662E3] rounded-sm text-[#3662E3] cursor-pointer" />
                </Link>

                <Link href={"https://github.com/Chiqueto"} target="_blank">
                    <GithubIcon size={32} className="p-1 border-2 border-solid border-[#CCC0C0] rounded-sm text-[#CCC0C0] cursor-pointer" />
                </Link>


            </div>

            <div className="p-4 bg-tertiary rounded-md">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                <>
                    <div className="text-sm flex flex-row justify-between items-center gap-2">
                        <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                            <Smartphone size={12} className="inline" />
                        </div>
                        <p className="flex-1 font-inter font-medium text-sm">+55 (16) 99968-6044</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="text-sm flex flex-row justify-between items-center gap-2">
                        <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                            <Mail size={12} className="inline" />
                        </div>
                        <p className="flex-1 font-inter font-medium text-sm">lfchiqueto@gmail.com</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="text-sm flex flex-row justify-between items-center gap-2">
                        <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                            <MapPin size={12} className="inline" />
                        </div>
                        <p className="flex-1 font-inter font-medium text-sm">São Joaquim da Barra, SP</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="text-sm flex flex-row justify-between items-center gap-2">
                        <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                            <Calendar size={12} className="inline" />
                        </div>
                        <p className="flex-1 font-inter font-medium text-sm">08, MAR. 2005</p>
                    </div>
                </>

            </div>

            <Button variant={"default"} className="border-2 border-solid border-card-border font-bold" asChild>
                <a href="https://drive.google.com/file/d/1_UKDOsvsPBOBX-9TounuUTzAdqDy5WIE/view?usp=sharing"
                    download={"Luis Felipe Chiqueto - Curriculo.pdf"}
                    target="_blank">
                    Meu Curriculo
                </a>

            </Button>

        </Card>
    </section >);
}

export default Presentation;