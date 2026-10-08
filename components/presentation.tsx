import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, GithubIcon, Instagram, LinkedinIcon, Mail, MapPin, Smartphone } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function Presentation({ profile }: { profile: any }) {
    if (!profile) return null;

    const birthDateStr = profile.birth_date ? new Date(profile.birth_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : "N/A";

    return (
        <section className="mt-36 max-w-sm ">
            <Card className="flex flex-col items-center justify-center px-2 pb-6">
                <div className="group relative h-[200px] w-[200px] mx-auto mt-[-80px] [perspective:1000px]">
                    <div
                        className="relative w-full h-full duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                    >
                        <div
                            className="absolute w-full h-full rounded-lg border-4 border-solid border-card-border [backface-visibility:hidden]"
                        >
                            <Image
                                src={profile.avatar_url || "/profile_pic_cartoon.png"}
                                fill
                                className="object-cover rounded-lg"
                                alt={profile.name}
                            />
                        </div>

                        <div
                            className="absolute w-full h-full rounded-lg border-4 border-solid border-card-border [transform:rotateY(180deg)] [backface-visibility:hidden]"
                        >
                            <Image
                                src={profile.github_url ? `${profile.github_url}.png` : "/profile_pic_cartoon.png"}
                                fill
                                className="object-cover rounded-lg"
                                alt={`${profile.name} - GitHub`}
                            />
                        </div>
                    </div>
                </div>
                <h1 className="lg:text-2xl text-lg md:text-lg font-inter font-bold text-center mt-4">{profile.name}</h1>
                
                {profile.headline && (
                    <Badge variant={"secondary"} className="p-2 border border-solid border-card-border font-inter text-base mt-2">
                        {profile.headline}
                    </Badge>
                )}
                
                <div className="flex flex-row gap-2 items-center justify-center mt-4">
                    {profile.instagram_url && (
                        <Link href={profile.instagram_url} target="_blank">
                            <Instagram size={32} className="p-1 border-2 border-solid border-[#E77975] rounded-sm text-[#E77975] cursor-pointer" />
                        </Link>
                    )}

                    {profile.linkedin_url && (
                        <Link href={profile.linkedin_url} target="_blank">
                            <LinkedinIcon size={32} className="p-1 border-2 border-solid border-[#3662E3] rounded-sm text-[#3662E3] cursor-pointer" />
                        </Link>
                    )}

                    {profile.github_url && (
                        <Link href={profile.github_url} target="_blank">
                            <GithubIcon size={32} className="p-1 border-2 border-solid border-[#CCC0C0] rounded-sm text-[#CCC0C0] cursor-pointer" />
                        </Link>
                    )}
                </div>

                <div className="p-4 bg-tertiary rounded-md w-full mt-4">
                    {profile.phone && (
                        <>
                            <div className="text-sm flex flex-row justify-between items-center gap-2">
                                <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                                    <Smartphone size={12} className="inline" />
                                </div>
                                <p className="flex-1 font-inter font-medium text-sm">{profile.phone}</p>
                            </div>
                            <Separator className="my-2" />
                        </>
                    )}
                    {profile.email && (
                        <>
                            <div className="text-sm flex flex-row justify-between items-center gap-2">
                                <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                                    <Mail size={12} className="inline" />
                                </div>
                                <p className="flex-1 font-inter font-medium text-sm">{profile.email}</p>
                            </div>
                            <Separator className="my-2" />
                        </>
                    )}
                    {profile.location && (
                        <>
                            <div className="text-sm flex flex-row justify-between items-center gap-2">
                                <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                                    <MapPin size={12} className="inline" />
                                </div>
                                <p className="flex-1 font-inter font-medium text-sm">{profile.location}</p>
                            </div>
                            <Separator className="my-2" />
                        </>
                    )}
                    {profile.birth_date && (
                        <div className="text-sm flex flex-row justify-between items-center gap-2">
                            <div className="p-2 bg-zinc-300 rounded-sm text-zinc-900 font-medium flex">
                                <Calendar size={12} className="inline" />
                            </div>
                            <p className="flex-1 font-inter font-medium text-sm">{birthDateStr}</p>
                        </div>
                    )}
                </div>

                {profile.resume_url && (
                    <Button variant={"default"} className="border-2 border-solid border-card-border font-bold w-full mt-4" asChild>
                        <a href={profile.resume_url} download target="_blank">
                            Meu Currículo
                        </a>
                    </Button>
                )}
            </Card>
        </section >
    );
}