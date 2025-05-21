'use client';

import Experience from "./main-content/experience";
import Home from "./main-content/home";
import Skills from "./main-content/skills";
import { Card } from "./ui/card";
import { useTab } from "@/app/page";

const MainContent = () => {
    const { selectedTab } = useTab();
    return (
        <main className="max-w-sm w-full md:max-w-[100%] md:mt-20">
            <Card className="px-4">
                {selectedTab === "home" && (<Home />)}
                {selectedTab === "experience" && (<Experience />)}
                {selectedTab === "skills" && (<Skills />)}
            </Card>

        </main>);
}

export default MainContent;