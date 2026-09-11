import ContactFaq from "../components/contact/ContactFaq";
import ContactFormSection from "../components/contact/ContactFormSection";
import ContactHero from "../components/contact/ContactHero";
import ContactMap from "../components/contact/ContactMap";

export const metadata = {
  title: "Contact Us | Kwaye Foundation",
  description:
    "Get in touch with Kingdom Women And Youth Empowerment Foundation in Jos South, Plateau State. Partnerships, donations, and general inquiries.",
};

export default function ContactUsPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactMap />
      <ContactFaq />
    </>
  );
}
