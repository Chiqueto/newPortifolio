import Sidebar from "@/components/sidebar";
import Overview from "@/components/sections/overview";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Capabilities from "@/components/sections/capabilities";
import Contact from "@/components/sections/contact";
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
    <div className="min-h-screen bg-background">
      <Sidebar profile={profile} />

      {/* Main content — offset for desktop sidebar */}
      <main className="md:ml-[280px]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20 space-y-32">
          <section id="overview">
            <Overview profile={profile} />
          </section>

          <section id="projects">
            <Projects projects={projects} />
          </section>

          <section id="experience">
            <Experience experiences={experiences} education={education} />
          </section>

          <section id="capabilities">
            <Capabilities technologies={technologies} />
          </section>

          <section id="contact">
            <Contact profile={profile} />
          </section>
        </div>

        {/* Footer */}
        <footer className="md:ml-0 border-t border-border px-6 md:px-12 py-8 max-w-3xl mx-auto">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Luís Felipe Chiqueto · Built with Next.js
          </p>
        </footer>
      </main>
    </div>
  );
}
