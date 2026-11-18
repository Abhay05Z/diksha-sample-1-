"use client";

import { useMemo, useState } from "react";
import { collections } from "@/data/collections";
import { appointmentEnquiry, whatsappHref } from "@/lib/whatsapp";

type Errors = Partial<Record<"name" | "phone" | "date" | "time" | "interest", string>>;

function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function timeOptions() {
  const options: string[] = [];
  for (let minutes = 10 * 60; minutes <= 20 * 60 + 30; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    options.push(`${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`);
  }
  return options;
}

export function AppointmentForm() {
  const times = useMemo(() => timeOptions(), []);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState("Gold Jewellery");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [fallback, setFallback] = useState("");

  function validate() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please add your name.";
    const digits = phone.replace(/\D/g, "");
    const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (!/^[6-9]\d{9}$/.test(local)) next.phone = "Enter a 10-digit Indian mobile number.";
    if (!date) next.date = "Choose a preferred date.";
    else if (date < todayISO()) next.date = "Choose today or a later date.";
    if (!time) next.time = "Choose a preferred time.";
    if (!interest) next.interest = "Choose a jewellery interest.";
    return next;
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setNotice("");
    setFallback("");
    if (Object.keys(next).length) return;
    const url = whatsappHref(appointmentEnquiry({ name: name.trim(), phone: phone.trim(), date, time, interest, message }));
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    setFallback(url);
    setNotice(
      opened
        ? "WhatsApp should be open with your request. The showroom confirms the visit only by replying. This is not a completed booking."
        : "The new tab was blocked. Use the WhatsApp link below to send the same request. Nothing is booked until the showroom replies.",
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <label className="field">
        <span>Name</span>
        <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} />
        {errors.name ? <span className="error">{errors.name}</span> : null}
      </label>
      <label className="field">
        <span>Phone</span>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
        {errors.phone ? <span className="error">{errors.phone}</span> : null}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field">
          <span>Preferred date</span>
          <input type="date" min={todayISO()} value={date} onChange={(event) => setDate(event.target.value)} aria-invalid={Boolean(errors.date)} />
          {errors.date ? <span className="error">{errors.date}</span> : null}
        </label>
        <label className="field">
          <span>Preferred time</span>
          <select value={time} onChange={(event) => setTime(event.target.value)} aria-invalid={Boolean(errors.time)}>
            <option value="">Select a time</option>
            {times.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.time ? <span className="error">{errors.time}</span> : null}
        </label>
      </div>
      <label className="field">
        <span>Jewellery interest</span>
        <select value={interest} onChange={(event) => setInterest(event.target.value)}>
          {collections.map((collection) => (
            <option key={collection.slug}>{collection.name}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="field">
        <span>Message</span>
        <textarea rows={4} value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <button className="btn btn-primary" type="submit">
        Send appointment request on WhatsApp
      </button>
      <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
        The form does not store a booking. It opens WhatsApp so the showroom can read your request and reply.
      </p>
      {notice ? <p style={{ margin: 0 }}>{notice}</p> : null}
      {fallback ? (
        <a className="btn btn-ghost" href={fallback} target="_blank" rel="noopener noreferrer">
          Open WhatsApp
        </a>
      ) : null}
    </form>
  );
}
