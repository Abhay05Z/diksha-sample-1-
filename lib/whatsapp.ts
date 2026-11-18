import { business } from "@/data/business";

export function whatsappHref(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productEnquiry(name: string, code?: string) {
  const codeLine = code ? ` (sample code ${code})` : "";
  return `Hello Diksha Jewellers, I am interested in your ${name}${codeLine}. Please share more details and availability.`;
}

export function collectionEnquiry(name: string) {
  return `Hello Diksha Jewellers, I am interested in your ${name} collection. Please share what is currently available at the showroom.`;
}

export function appointmentEnquiry(fields: {
  name: string;
  phone: string;
  date: string;
  time: string;
  interest: string;
  message: string;
}) {
  const lines = [
    "Hello Diksha Jewellers, I would like to request a showroom appointment.",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Preferred date: ${fields.date}`,
    `Preferred time: ${fields.time}`,
    `Jewellery interest: ${fields.interest}`,
  ];
  if (fields.message.trim()) lines.push(`Message: ${fields.message.trim()}`);
  lines.push("Please confirm whether this visit is possible. This message is a request, not a confirmed booking.");
  return lines.join("\n");
}

export const generalEnquiry = "Hello Diksha Jewellers, I would like to know more about the jewellery available at your Vidyadhar Nagar showroom.";

export function quoteEnquiry(fields: { name: string; phone: string; interest: string; quotation?: boolean }) {
  const ask = fields.quotation ? "I would like a quotation." : "I would like to know more.";
  return [
    "Hello Diksha Jewellers,",
    ask,
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Interested in: ${fields.interest}`,
  ].join("\n");
}

export function gmailHref(subject: string, body: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: business.enquiryEmail,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
