import { company, whatsappMessages } from "@/content/site";

/** Monta o link oficial do WhatsApp (wa.me) com uma mensagem opcional. */
export function whatsappLink(message: string = whatsappMessages.default): string {
  const base = `https://wa.me/${company.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mailtoLink = `mailto:${company.email}`;
export const telLink = `tel:${company.phoneE164}`;
