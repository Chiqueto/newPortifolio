import {
  getPublicProfile,
  getPublicProjects,
  getPublicExperiences,
  getPublicEducation,
  getPublicTechnologies,
} from "@/features/public/data";
import { PortfolioContainer } from "@/components/portfolio/portfolio-container";

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
    <PortfolioContainer
      profile={profile}
      projects={projects}
      experiences={experiences}
      education={education}
      technologies={technologies}
    />
  );
}
