import { TabProvider } from "@/components/providers/tab-provider";
import Sidebar from "@/components/sidebar";
import MainContent from "@/components/main-content";
import {
  getPublicProfile,
  getPublicProjects,
  getPublicExperiences,
  getPublicEducation,
  getPublicTechnologies,
} from "@/features/public/data";

export default async function Home() {
  const [profile, projects, experiences, education, technologies] =
    await Promise.all([
      getPublicProfile(),
      getPublicProjects(),
      getPublicExperiences(),
      getPublicEducation(),
      getPublicTechnologies(),
    ]);

  return (
    <TabProvider>
      {/* Layout de 2 colunas: sidebar fixa + conteúdo scrollável */}
      <div className="flex h-screen bg-background">
        <Sidebar profile={profile} />

        {/* Área de conteúdo: só ela rola */}
        <div className="flex-1 overflow-y-auto md:pt-0 pt-[53px]">
          <MainContent
            projects={projects}
            experiences={experiences}
            education={education}
            technologies={technologies}
            profile={profile}
          />
        </div>
      </div>
    </TabProvider>
  );
}
