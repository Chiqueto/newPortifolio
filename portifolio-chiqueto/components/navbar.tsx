'use client'
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FaLaptopCode, FaUserLarge } from "react-icons/fa6";
import { BsViewList } from "react-icons/bs";
import { AiTwotoneSecurityScan } from "react-icons/ai";
import { RiContactsBook3Line } from "react-icons/ri";
import { useTab } from "@/app/page";



const Navbar = () => {

    const { selectedTab, setSelectedTab } = useTab();
    const handleSectionChange = (section: string) => {
        setSelectedTab(section);

    }

    return (
        <nav className="md:mt-64 max-w-sm">
            <Card className="flex flex-row md:flex-col items-center justify-between px-4 py-2">
                <Button variant={selectedTab === "home" ? "default" : "secondary"} onClick={() => handleSectionChange("home")} className="flex flex-col gap-1 md:w-[71px] md:h-full">
                    <FaUserLarge
                        className="text-card-foreground"
                        size={24}
                    />
                    <p className="text-card-foreground text-xs hidden md:inline">Home</p>
                </Button>

                <Button variant={selectedTab === "experience" ? "default" : "secondary"} onClick={() => handleSectionChange("experience")} className="flex flex-col md:w-[71px] gap-1 md:h-full">
                    <BsViewList
                        className="text-card-foreground"
                        size={24}
                    />
                    <p className="text-card-foreground text-xs hidden md:inline">Trajetória</p>

                </Button>
                <Button variant={selectedTab === "projects" ? "default" : "secondary"} onClick={() => handleSectionChange("projects")} className="flex flex-col md:w-[71px] gap-1 md:h-full">
                    <FaLaptopCode
                        className="text-card-foreground"
                        size={24}
                    />
                    <p className="text-card-foreground text-xs hidden md:inline">Projetos</p>

                </Button>
                <Button variant={selectedTab === "skills" ? "default" : "secondary"} onClick={() => handleSectionChange("skills")} className="flex flex-col md:w-[71px] gap-1 md:h-full">
                    <AiTwotoneSecurityScan
                        className="text-card-foreground"
                        size={24}
                    />
                    <p className="text-card-foreground text-xs hidden md:inline">Skills</p>

                </Button>
                <Button variant={selectedTab === "contact" ? "default" : "secondary"} onClick={() => handleSectionChange("contact")} className="flex flex-col md:w-[71px] gap-1 md:h-full">
                    <RiContactsBook3Line
                        className="text-card-foreground"
                        size={24}
                    />
                    <p className="text-card-foreground text-xs hidden md:inline">contato</p>

                </Button>
            </Card>
        </nav>);
}

export default Navbar;