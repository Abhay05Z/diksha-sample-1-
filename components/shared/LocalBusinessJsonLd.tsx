import { business } from "@/data/business";

export function LocalBusinessJsonLd() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const data = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: business.name,
    description:
      "Diksha Jewellers is a jewellery showroom in Vidyadhar Nagar, Jaipur, with gold, silver and diamond jewellery.",
    telephone: business.phoneTel,
    url: business.siteUrl,
    hasMap: business.mapsShare,
    image: `${business.siteUrl}${business.logo.dark}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1}, ${business.address.line2}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: "IN",
    },
    areaServed: "Jaipur",
    openingHoursSpecification: days.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: business.hours.opens,
      closes: business.hours.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
