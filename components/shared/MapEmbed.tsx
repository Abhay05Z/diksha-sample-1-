import { business } from "@/data/business";

export function MapEmbed() {
  return (
    <iframe
      className="map-frame"
      title="Map of Jewellery Store Sample, Vidyadhar Nagar, Jaipur"
      src={business.mapsEmbed}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
