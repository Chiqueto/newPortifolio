import Header from "@/components/header";
import MainContent from "@/components/main-content";
import Navbar from "@/components/navbar";
import Presentation from "@/components/presentation";
import { TabProvider } from "@/components/providers/tab-provider";
import { 
  getPublicProfile, 
  getPublicProjects, 
  getPublicExperiences, 
  getPublicEducation, 
  getPublicTechnologies 
} from "@/features/public/data";

export default async function Home() {
  const [profile, projects, experiences, education, technologies] = await Promise.all([
    getPublicProfile(),
    getPublicProjects(),
    getPublicExperiences(),
    getPublicEducation(),
    getPublicTechnologies(),
  ]);

  return (
    <TabProvider>
      <div className="">
        <Header />
        <div className="mx-4 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start" >
          <Presentation profile={profile} />
          <div className="hidden md:block flex-1">
            <MainContent 
              projects={projects} 
              experiences={experiences} 
              education={education} 
              technologies={technologies} 
            />
          </div>
          <Navbar />
          <div className="md:hidden">
            <MainContent 
              projects={projects} 
              experiences={experiences} 
              education={education} 
              technologies={technologies} 
            />
          </div>
        </div>
      </div>
    </TabProvider>
  );
}
