import AboutHero from "../components/about/AboutHero";
import FinancialBreakdown from "../components/about/FinancialBreakdown";
import JourneyTimeline from "../components/about/JourneyTimeline";
import LeadershipTeam from "../components/about/LeadershipTeam";
import MissionVisionValues from "../components/about/MissionVisionValues";

export const metadata = {
  title: "About Us | Kwaye Foundation",
  description:
    "Learn about Kingdom Women And Youth Empowerment Foundation—our mission, leadership, journey across Nigeria, and how we steward resources for impact.",
};

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <MissionVisionValues />
      <JourneyTimeline />
      <FinancialBreakdown />
      <LeadershipTeam />
    </>
  );
}
