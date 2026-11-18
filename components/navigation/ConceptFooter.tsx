import Link from "next/link";
import { addressLines, business } from "@/data/business";
import { collections } from "@/data/collections";
import type { ConceptId } from "@/data/concepts";
import { conceptPath } from "@/lib/routes";
import { generalEnquiry, whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/shared/Wordmark";

export function ConceptFooter({ concept }: { concept: ConceptId }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Wordmark />
          <p className="muted" style={{ maxWidth: "36ch" }}>
            A jewellery showroom in Vidyadhar Nagar, Jaipur. Gold, silver and diamond jewellery, seen in person.
          </p>
          <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
        </div>
        <div>
          <p className="label">Visit</p>
          {addressLines().map((line) => (
            <p key={line} style={{ margin: "0.15rem 0" }}>
              {line}
            </p>
          ))}
          <p className="muted">
            {business.hours.label}, {business.hours.days.toLowerCase()}.
          </p>
        </div>
        <div>
          <p className="label">Collections</p>
          {collections.slice(0, 6).map((collection) => (
            <div key={collection.slug}>
              <Link href={conceptPath(concept, `/collections/${collection.slug}`)}>{collection.name}</Link>
            </div>
          ))}
        </div>
        <div>
          <p className="label">Showroom</p>
          <div>
            <Link href={conceptPath(concept, "/about")}>About</Link>
          </div>
          <div>
            <Link href={conceptPath(concept, "/contact")}>Contact and appointment</Link>
          </div>
          <div>
            <Link href={conceptPath(concept, "/experience-360")}>360° experience</Link>
          </div>
          <div>
            <a href={whatsappHref(generalEnquiry)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
          <div>
            <a href={business.mapsDirections} target="_blank" rel="noopener noreferrer">
              Directions
            </a>
          </div>
        </div>
      </div>
      <div className="wrap fine">
        <p>
          Temporary wordmark, until the official logo is supplied. Jewellery photographs are licensed samples, not showroom inventory. No online checkout. Listed Google rating {business.rating.value} from {business.rating.count} reviews, {business.rating.note.toLowerCase()}
        </p>
        <p>© {new Date().getFullYear()} Jewellery Store Sample, Jaipur.</p>
      </div>
    </footer>
  );
}
