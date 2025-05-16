'use client'
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FaLaptopCode, FaUserLarge } from "react-icons/fa6";
import { BsViewList } from "react-icons/bs";
import { AiTwotoneSecurityScan } from "react-icons/ai";
import { RiContactsBook3Line } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
    const [isSelectedSection, setIsSelectedSection] = useState("home");

    const handleSectionChange = (section: string) => {
        setIsSelectedSection(section);

    }

    return (<nav className="md:mt-64">
        <Card className="flex flex-row md:flex-col items-center justify-between px-4 py-2">
            <Button variant={isSelectedSection === "home" ? "default" : "secondary"} onClick={() => handleSectionChange("home")} className="flex flex-col gap-2 md:h-full">
                <FaUserLarge
                    className="text-card-foreground"
                    size={24}
                />
                <p className="text-card-foreground text-xs hidden">Home</p>
            </Button>

            <Button variant={isSelectedSection === "experience" ? "default" : "secondary"} onClick={() => handleSectionChange("experience")} className="flex flex-col gap-2 md:h-full">
                <BsViewList
                    className="text-card-foreground"
                    size={24}
                />
                <p className="text-card-foreground text-xs hidden">Home</p>

            </Button>
            <Button variant={isSelectedSection === "projects" ? "default" : "secondary"} onClick={() => handleSectionChange("projects")} className="flex flex-col gap-2 md:h-full">
                <FaLaptopCode
                    className="text-card-foreground"
                    size={24}
                />
                <p className="text-card-foreground text-xs hidden">Home</p>

            </Button>
            <Button variant={isSelectedSection === "skills" ? "default" : "secondary"} onClick={() => handleSectionChange("skills")} className="flex flex-col gap-2 md:h-full">
                <AiTwotoneSecurityScan
                    className="text-card-foreground"
                    size={24}
                />
                <p className="text-card-foreground text-xs hidden">Home</p>

            </Button>
            <Button variant={isSelectedSection === "contact" ? "default" : "secondary"} onClick={() => handleSectionChange("contact")} className="flex flex-col gap-2 md:h-full">
                <RiContactsBook3Line
                    className="text-card-foreground"
                    size={24}
                />
                <p className="text-card-foreground text-xs hidden">Home</p>

            </Button>
            {/* Outros itens de navegação aqui */}
        </Card>
    </nav>);
}

export default Navbar;