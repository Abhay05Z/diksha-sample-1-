import type { Metadata, Viewport } from "next";
import { business } from "@/data/business";
import { LocalBusinessJsonLd } from "@/components/shared/LocalBusinessJsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Jewellery Store Sample, Jaipur",
    template: "%s · Jewellery Store Sample",
  },
  description:
    "Jewellery Store Sample is a jewellery showroom in Vidyadhar Nagar, Jaipur, for gold, silver and diamond jewellery. Visit B-66, LS Nagar Road, near Biyani Group of College.",
  applicationName: "Jewellery Store Sample",
  icons: { icon: business.logo.favicon },
  openGraph: {
    siteName: "Jewellery Store Sample",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14110f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="sr-only focus:not-sr-only" href="#content">
          Skip to content
        </a>
        {children}
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
