"use client";

import { useState } from "react";
import SkillMatcher from "./SkillMatcher";
import VolunteerForm from "./VolunteerForm";
import VolunteerHero from "./VolunteerHero";

export default function VolunteerPageClient() {
  const [preferredRole, setPreferredRole] = useState("");

  const handleSelectRole = (roleTitle) => {
    setPreferredRole(roleTitle);
    const el = document.getElementById("apply");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <VolunteerHero />
      <SkillMatcher onSelectRole={handleSelectRole} />
      <VolunteerForm preferredRole={preferredRole} />
    </>
  );
}
