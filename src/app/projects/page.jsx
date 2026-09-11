import BeforeAfterSection from "../components/projects/BeforeAfterSection";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectsHero from "../components/projects/ProjectsHero";

export const metadata = {
  title: "Projects | Kwaye Foundation",
  description:
    "Explore Kwaye Foundation field projects across Nigeria—women empowerment, youth skills, and community relief initiatives.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
      <BeforeAfterSection />
    </>
  );
}
