import { business } from "@/data/business";

export function Wordmark() {
  if (!business.logo.temporary) {
    return (
      // Official logo slot. Swap the files in business.ts when the real mark arrives.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={business.logo.dark} alt="Diksha Jewellers" style={{ height: 42, width: "auto" }} />
    );
  }

  return (
    <span className="wordmark">
      <b>Diksha</b>
      <span>Jewellers</span>
    </span>
  );
}
