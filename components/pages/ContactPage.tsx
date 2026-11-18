import Link from "next/link";
import { addressLines, business } from "@/data/business";
import { concepts, type ConceptId } from "@/data/concepts";
import { AppointmentForm } from "@/components/booking/AppointmentForm";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { generalEnquiry, whatsappHref } from "@/lib/whatsapp";

export function ContactPage({ concept }: { concept: ConceptId }) {
  const theme = concepts[concept];
  return (
    <div className="wrap py-14">
      <p className="label">{theme.name}</p>
      <h1 className="font-display text-5xl md:text-6xl">The showroom</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-display text-3xl">{business.name}</h2>
          {addressLines().map((line) => (
            <p key={line} className="mb-0 text-lg">
              {line}
            </p>
          ))}
          <p>
            <a href={`tel:${business.phoneTel}`}>Phone: {business.phoneDisplay}</a>
          </p>
          <p>
            Opening hours: {business.hours.label}, daily. {business.hours.note}
          </p>
          <p>Listed at {business.rating.value}/5 from {business.rating.count} Google reviews. {business.rating.note}</p>
          <div className="mt-4 flex flex-col items-start gap-3">
            <a className="btn btn-primary" href={`tel:${business.phoneTel}`}>
              Click to call
            </a>
            <a className="btn btn-ghost" href={whatsappHref(generalEnquiry)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a className="btn btn-ghost" href={business.mapsDirections} target="_blank" rel="noopener noreferrer">
              Google Maps directions
            </a>
            <a className="btn btn-ghost" href={business.mapsShare} target="_blank" rel="noopener noreferrer">
              Business profile
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            A photograph of this exact showroom was not found in public sources, so none is shown. The map uses the published address.
          </p>
        </div>
        <div className="min-h-[360px] bg-[var(--bg-soft)]">
          <MapEmbed />
        </div>
      </div>
      <section id="appointment" className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <p className="label">Appointment</p>
          <h2 className="font-display text-4xl">Ask for a time.</h2>
          <p className="text-[var(--muted)]">Tell the showroom when you would like to come. You will be taken to WhatsApp with the details filled in.</p>
        </div>
        <AppointmentForm />
      </section>
      <p className="mt-10">
        <Link href={conceptPathSafe(concept)}>Back to this concept</Link>
      </p>
    </div>
  );
}

function conceptPathSafe(concept: ConceptId) {
  return `/${concept}`;
}
