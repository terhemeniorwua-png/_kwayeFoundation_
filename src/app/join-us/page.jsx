import DonationInterface from "../components/join/DonationInterface";
import JoinHero from "../components/join/JoinHero";

export const metadata = {
  title: "Join Us & Donate | Kwaye Foundation",
  description:
    "Support Kingdom Women And Youth Empowerment Foundation. Give one-time or monthly to fuel sustainable projects across Nigeria.",
};

export default function JoinUsPage() {
  return (
    <>
      <JoinHero />
      <DonationInterface />
    </>
  );
}
