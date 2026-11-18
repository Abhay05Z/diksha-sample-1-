import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Visit Diksha Jewellers at B-66, LS Nagar Road, Vidyadhar Nagar, Jaipur. Call +91 99292 75335 or request an appointment on WhatsApp.",
  path: "/concept-3/contact",
});

export default function Page() {
  return <ContactPage concept="concept-3" />;
}
