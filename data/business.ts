/**
 * Editable showroom facts.
 * Use the fields below as the only source for address, phone, hours and maps.
 * Do not add a founding year, founder biography, awards or certifications here
 * unless the client confirms them. Directory listings disagree and were not used.
 */
export const business = {
  name: "Diksha Jewellers",
  category: "Jewellery showroom",
  phoneDisplay: "+91 99292 75335",
  phoneTel: "+919929275335",
  whatsappNumber: "919929275335",
  /**
   * Shown on the public place listing that matches this phone.
   * Replace it if the showroom uses a different Gmail address.
   */
  enquiryEmail: "dikshajewellers4you@gmail.com",
  /** No official Instagram profile was found. The button searches for one until a URL is added. */
  instagramUrl: "https://www.google.com/search?q=Diksha+Jewellers+Jaipur+Instagram",
  address: {
    line1: "B-66, LS Nagar Road",
    line2: "Near Biyani Group of College",
    area: "Vidyadhar Nagar",
    city: "Jaipur",
    region: "Rajasthan",
    postalCode: "302039",
    country: "India",
  },
  hours: {
    label: "10:00 AM – 9:00 PM",
    days: "All seven days",
    note: "According to the public listing. Please confirm before you visit.",
    opens: "10:00",
    closes: "21:00",
  },
  rating: {
    value: "4.8",
    count: 13,
    source: "Google",
    note: "At the time of research.",
  },
  mapsShare: "https://share.google/TBnfnM9TbVxmR7Leu",
  mapsDirections:
    "https://www.google.com/maps/search/?api=1&query=Diksha%20Jewellers%20B-66%20LS%20Nagar%20Road%20Vidyadhar%20Nagar%20Jaipur%20302039",
  mapsEmbed:
    "https://maps.google.com/maps?q=Diksha%20Jewellers%2C%20B-66%20LS%20Nagar%20Road%2C%20Vidyadhar%20Nagar%2C%20Jaipur%20302039&z=16&output=embed",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  logo: {
    temporary: true,
    light: "/assets/brand/wordmark-light.svg",
    dark: "/assets/brand/wordmark-dark.svg",
    favicon: "/assets/brand/favicon.svg",
    note: "Temporary website wordmark. Replace these files and set temporary to false when the official logo is available.",
  },
} as const;

export function addressLines() {
  const a = business.address;
  return [a.line1, a.line2, `${a.area}, ${a.city}`, `${a.region} ${a.postalCode}`, a.country];
}

export function addressInline() {
  return addressLines().join(", ");
}
