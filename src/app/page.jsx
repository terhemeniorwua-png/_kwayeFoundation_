import DonationProgress from "./components/home/DonationProgress";
import Hero from "./components/home/Hero";
import HowYouCanHelp from "./components/home/HowYouCanHelp";
import ImpactMap from "./components/home/ImpactMap";
import Metrics from "./components/home/Metrics";
import ProjectsGallery from "./components/home/ProjectsGallery";
import Testimonials from "./components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <HowYouCanHelp />
      <ImpactMap />
      <ProjectsGallery />
      <Testimonials />
      <DonationProgress />
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
