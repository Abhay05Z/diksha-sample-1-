"use client";

import { useEffect, useState } from "react";
import { gmailHref, quoteEnquiry, whatsappHref } from "@/lib/whatsapp";

const interests = [
  "Gold jewellery",
  "Diamond jewellery",
  "Silver jewellery",
  "Bridal jewellery",
  "Kundan",
  "Polki",
  "Necklaces",
  "Earrings",
  "Rings",
  "Bangles",
  "Mangalsutra",
  "Maang tikka",
];

export function WelcomePopup({
  open,
  quotation,
  onClose,
}: {
  open: boolean;
  quotation?: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Bridal jewellery");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function details() {
    if (name.trim().length < 2) return "Please add your name.";
    const digits = phone.replace(/\D/g, "");
    const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (!/^[6-9]\d{9}$/.test(local)) return "Enter a 10-digit mobile number.";
    if (!interest) return "Choose what you are interested in.";
    return "";
  }

  function send(kind: "whatsapp" | "gmail") {
    const problem = details();
    if (problem) {
      setError(problem);
      return;
    }
    const body = quoteEnquiry({ name: name.trim(), phone: phone.trim(), interest, quotation });
    const url = kind === "whatsapp" ? whatsappHref(body) : gmailHref(quotation ? "Quotation request" : "Jewellery enquiry", body);
    window.open(url, "_blank", "noopener,noreferrer");
    sessionStorage.setItem("diksha-welcome", "sent");
    onClose();
  }

  return (
    <div className="welcome-back" onClick={onClose}>
      <form
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          send("whatsapp");
        }}
      >
        <p className="label">Diksha Jewellers · Jaipur</p>
        <h2 id="welcome-title" className="font-display">
          {quotation ? "Get a quotation" : "Tell us what you are looking for"}
        </h2>
        <p className="welcome-note">Name, a category, and your number. Nothing is booked until the showroom replies.</p>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </label>
        <label>
          Interested in
          <select value={interest} onChange={(event) => setInterest(event.target.value)}>
            {interests.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Mobile number
          <input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" placeholder="10-digit number" />
        </label>
        {error ? <p className="welcome-error">{error}</p> : null}
        <div className="welcome-actions">
          <button className="btn btn-primary" type="submit">
            Send on WhatsApp
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => send("gmail")}>
            Send on Gmail
          </button>
        </div>
        <button className="welcome-skip" type="button" onClick={onClose}>
          Not now
        </button>
      </form>
    </div>
  );
}
