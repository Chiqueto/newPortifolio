'use client';

import { useTab } from "@/hooks/useTab";
import Experience from "./main-content/experience";
import Home from "./main-content/home";
import Skills from "./main-content/skills";
import { Card } from "./ui/card";
import Projects from "./main-content/projects";
import Contact from "./main-content/contact";

export default function MainContent({ 
    projects, 
    experiences, 
    education, 
    technologies 
}: { 
    projects: any[], 
    experiences: any[], 
    education: any[], 
    technologies: any[] 
}) {
    const { selectedTab } = useTab();
    return (
        <main className="max-w-sm w-full md:max-w-[100%] md:mt-20">
            <Card className="px-4 pb-4">
                {selectedTab === "home" && (<Home />)}
                {selectedTab === "experience" && (<Experience experiences={experiences} education={education} />)}
                {selectedTab === "skills" && (<Skills technologies={technologies} />)}
                {selectedTab === "projects" && (<Projects projects={projects} />)}
                {selectedTab === "contact" && (<Contact />)}
            </Card>
        </main>);
}